/**
 * Методы обновления History
 */

import { Main } from "@classes";
import { TFnKillExcel, TFnCountAresData, TFnUpdate, TFnCountUsersKPIs, TFnCountFirstLevel, TFnCountSecondLevel, TFnCountThirdLevel } from "./@types";
import { cmd, replaceDataBetweenTables, getRowsCount } from "@utils";
import { refreshDateIdUserOnError } from "./lib";
import moment from "moment";
import axios from "axios";

export default class History extends Main {
  constructor() {
    super();
  }

  /**
   * Запуск обновления
   */
  public update: TFnUpdate = async () => {
    this.killExcel();
    return true;
  }


  /**
   * Убийство всех Excel-процессов под текущей учеткой
   */
  public killExcel: TFnKillExcel = async () => {
    try {
      const result: any = await cmd("powershell.exe", [`${process.env.APP_ROOT}/src/Scripts/getCurrentUserName.ps1`], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.killExcel()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Закрываются все Excel-процессы под учетной записью ${result[0]}...`,
        hashtags: ["history", "killExcel"]
      });

      await cmd("powershell.exe", [`${process.env.APP_ROOT}/src/Scripts/killExcel.ps1`], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.killExcel()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Все Excel-процессы успешно закрыты!",
        hashtags: ["history", "killExcel"]
      });

      this.countAresData();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/killExcel`;
      const nextUrl = `${protocol}://${host}:${port}/history/countAresData`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.killExcel()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "killExcel"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * Подсчет данных из системы ARES
   */
  public countAresData: TFnCountAresData = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.countAresData()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Начинается расчет данных из системы ARES...",
        hashtags: ["history", "killExcel", "countAresData"]
      });

      const method = "POST";

      await axios({ method, url: "http://ares:7000/tasks/countCritChat" });
      await axios({ method, url: "http://ares:7000/tasks/countCritGOZ" });
      await axios({ method, url: "http://ares:7000/tasks/countCritTT" });

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.countAresData()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Данные из системы ARES успешно рассчитаны!",
        hashtags: ["history", "killExcel", "countAresData"]
      });

      this.countUsersKPIs();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/countAresData`;
      const nextUrl = `${protocol}://${host}:${port}/history/countAresData`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.countAresData()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "countAresData"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * Рассчет всех таблиц
   */
  public countUsersKPIs: TFnCountUsersKPIs = async () => {

    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.countUsersKPIs()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Начинается обновление таблиц для History...",
        hashtags: ["history", "countUsersKPIs"]
      });

      await this.countFirstLevel();
      await this.countSecondLevel();
      await this.countThirdLevel();

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.countUsersKPIs()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Таблицы для History успешно обновлены!",
        hashtags: ["history", "countUsersKPIs"]
      });

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/countUsersKPIs`;
      const nextUrl = `${protocol}://${host}:${port}/history/countUsersKPIs`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.countUsersKPIs()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "countUsersKPIs"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * Таблицы 1 уровня
   */
  public countFirstLevel: TFnCountFirstLevel = async () => {
    // Структурные таблицы
    const structure = async () => {
      await replaceDataBetweenTables(this.db, "reportdb.vdates", "reportdb.dates", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vudateuserlist", "reportdb.udateuserlist", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vudateuserlisthead", "reportdb.udateuserlisthead", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vuserlistdaystruct", "reportdb.userlistdaystruct", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vuserlistdaystructfullname", "reportdb.userlistdaystructfullname", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vcasper_struct", "reportdb.casper_struct", "History");
    }

    // ACD
    const acd = async () => {
      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdline", "reportdb.uuseracdline", "History");
      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdprep", "reportdb.uuseracdprep", "History");
    }

    const cuvo = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoline", "reportdb.uusercuvoline", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvomailprep", "reportdb.uusercuvomailprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoonlineprep", "reportdb.uusercuvoonlineprep", "History")
      ]);
    }

    const crit = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsline", "reportdb.uusercriterroncallsline", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsline_ccb", "reportdb.uusercriterroncallsline_ccb", "History")
      ]);
    }

    const webtutor = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_detail", "reportdb.uuserwebtutor_detail", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_detail_mentors", "reportdb.uuserwebtutor_detail_mentors", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdline_exc_yar_ivan", "reportdb.uuseracdline_exc_yar_ivan", "History")
      ]);
    }

    const upsales = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolumeprep", "reportdb.uuupsalesvolumeprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep", "reportdb.uucbmoffersvolumeprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_crm", "reportdb.uucbmoffersvolumeprep_crm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn", "reportdb.uucbmoffersvolumeprep_conn", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn_crm", "reportdb.uucbmoffersvolumeprep_conn_crm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn_crm_msk", "reportdb.uucbmoffersvolumeprep_conn_crm_msk", "History"),
      ]);
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusubgroup", "reportdb.uusubgroup", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserteleoptiagentinfo", "reportdb.userteleoptiagentinfo", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsprep", "reportdb.uuseraccidentsprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vmailsbyregionuserdate", "reportdb.mailsbyregionuserdate", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuupaymentsprep", "reportdb.uupaymentsprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatnotesnewprep", "reportdb.uurepeatnotesnewprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatsubnotes24_prep", "reportdb.uurepeatsubnotes24_prep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuseroutofdecret", "reportdb.useroutofdecret", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusertmexception", "reportdb.uusertmexception", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsprepwotechccb", "reportdb.uuseraccidentsprepwotechccb", "History")
      ]);
    }

    await Promise.all([
      structure(),
      acd(),
      crit(),
      webtutor(),
      upsales(),
      other()
    ]);

    return true;
  }

  /**
   * Таблицы 2 уровня
   */
  public countSecondLevel: TFnCountSecondLevel = async () => {
    // ACD
    const acd = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuseracd", "reportdb.uuseracd", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdallabonprep", "reportdb.uuseracdallabonprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdtm", "reportdb.uuseracdtm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdahttm", "reportdb.uuseracdahttm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercontactstm", "reportdb.uusercontactstm", "History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdallabon", "reportdb.uuseracdallabon", "History");
    }

    // CuVo
    const cuvo = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvovip", "reportdb.uusercuvovip", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo611", "reportdb.uusercuvo611", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo636", "uusercuvo636", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvocdma", "uusercuvocdma", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo687q1wotech", "uusercuvo687q1wotech", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo687q2", "uusercuvo687q2", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvomail", "reportdb.uusercuvomail", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoonline", "reportdb.uusercuvoonline", "History")
      ]);
    }

    // Криты
    const crit = async () => {
      await replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoperprep", "reportdb.uusercriterroncallsoperprep", "History");

      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoper", "reportdb.uusercriterroncallsoper", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallstmprep", "reportdb.uusercriterroncallstmprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoperprep_ccb", "reportdb.uusercriterroncallsoperprep_ccb", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercrittelegram", "reportdb.uusercrittelegram", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritgplay", "reportdb.uusercritgplay", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritmail", "reportdb.uusercritmail", "History")
      ]);
    }

    // Соблюдение
    const adherence = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuseradherencedetail", "reportdb.uuseradherencedetail", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserabsenceprep", "reportdb.uuserabsenceprep", "History")
      ]);
    }

    // ДП
    const dp = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24tm_teststr", "reportdb.uuserconn24tm_teststr", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24preptm", "reportdb.uuserconn24preptm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vservidlistdatavas_numumbupsale", "reportdb.servidlistdatavas_numumbupsale", "History")
      ]);
    }

    const accidents = async () => {
      const rowsCount: number = await getRowsCount(this.db, "reportdb.uuseraccidentsprep");

      if (rowsCount > 0) {
        await Promise.all([
          replaceDataBetweenTables(this.db, "reportdb.vuuseraccidents", "reportdb.uuseraccidents", "History"),
          replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsmass", "reportdb.uuseraccidentsmass", "History")
        ]);
      } else {
        await Promise.all([
          refreshDateIdUserOnError("reportdb.uuseraccidents"),
          refreshDateIdUserOnError("reportdb.uuseraccidentsmass")
        ]);
      }
    }

    // Расписание
    const schedule = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_workday", "reportdb.rtmschedule_workday", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday611", "reportdb.rtmscheduleday611", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday614", "reportdb.rtmscheduleday614", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday636", "reportdb.rtmscheduleday636", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday_claims", "reportdb.rtmscheduleday_claims", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduledaymnp", "reportdb.rtmscheduledaymnp", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmtraff_day", "reportdb.rtmtraff_day", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmtraff_day_nocc", "reportdb.rtmtraff_day_nocc", "History")
      ]);
    }

    const upsales = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume", "reportdb.uuupsalesvolume", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume_conn", "reportdb.uupsalesvolume_conn", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume_conn_msk", "reportdb.uupsalesvolume_conn_msk", "History")
      ]);
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusertminterviews", "reportdb.uusertminterviews", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserstafftime", "reportdb.uuserstafftime", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnpout", "reportdb.uusermnpout", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnpinnewtt", "reportdb.uusermnpinnewtt", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vmailsbyuserdate", "reportdb.mailsbyuserdate", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserchats_prep", "reportdb.uuserchats_prep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutorprep", "reportdb.uuserwebtutorprep", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutorprep_mentors", "reportdb.uuserwebtutorprep_mentors", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserroles", "reportdb.userroles", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserroles_prep", "reportdb.userroles_prep", "History")
      ]);
    }

    await Promise.all([
      acd(),
      cuvo(),
      crit(),
      adherence(),
      dp(),
      accidents(),
      schedule(),
      other()
    ]);

    return true;
  }

  /**
   * Таблицы 3 уровня
   */
  public countThirdLevel: TFnCountThirdLevel = async () => {
    // Криты
    const crit = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallstm", "reportdb.uusercriterroncallstm", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritintarget", "reportdb.uusercritintarget", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoper_ccb", "reportdb.uusercriterroncallsoper_ccb", "History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vuuserevalsintarget", "reportdb.uuserevalsintarget", "History");
    }

    // Соблюдение
    const adherence = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuseradherence", "reportdb.uuseradherence", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserabsence", "reportdb.uuserabsence", "History")
      ]);
    }

    // ДП
    const dp = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24preptmstr", "reportdb.uuserconn24preptmstr", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusereff", "reportdb.uusereff", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusereffb2b", "reportdb.uusereffb2b", "History")
      ]);

      const rowsCount: number = await getRowsCount(this.db, "reportdb.uuserconn24preptm");

      if (rowsCount > 0) {
        await replaceDataBetweenTables(this.db, "reportdb.vuuserconn24tm", "reportdb.uuserconn24tm", "History");
      } else {
        await refreshDateIdUserOnError("uuserconn24tm");
      }
    }

    // Расписание
    const schedule = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day", "reportdb.rtmschedule_traff_day", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day_nocc", "reportdb.rtmschedule_traff_day_nocc", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmsl_mistake", "reportdb.rtmsl_mistake", "History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day_struct", "reportdb.rtmschedule_traff_day_struct", "History");
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusermails", "reportdb.uusermails", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserchats", "reportdb.uuserchats", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor", "reportdb.uuserwebtutor", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_mentors", "reportdb.uuserwebtutor_mentors", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuupayments", "reportdb.uupayments", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatnotesnew", "reportdb.uurepeatnotesnew", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnphold", "reportdb.uusermnphold", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vdataevalonlinechannels_report_all", "reportdb.dataevalonlinechannels_report_all", "History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentswotechccb", "reportdb.uuseraccidentswotechccb", "History")
      ]);
    }

    await Promise.all([
      crit(),
      adherence(),
      dp(),
      schedule(),
      other()
    ]);

    return true;
  }
}