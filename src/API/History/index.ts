/**
 * Методы обновления History
 */

import { Main } from "@classes";
import {
  TFnKillExcel,
  TFnCountAresData,
  TFnUpdate,
  TFnCountUsersKPIs,
  TFnCountFirstLevel,
  TFnCountSecondLevel,
  TFnCountThirdLevel,
  TFnRefreshHistoryDB,
  TFnRefreshRoles,
  TFnCopyDataToMainReport,
  TFnConsultingData,
  TFnCopyToInternalReportCC,
  TFnCopyToArchiv,
  TFnCountSeniorPivot,
  TFnMakeGroupList
} from "./@types";
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
   * 02-RefreshHistoryDB
   */
  public refreshHistoryDB: TFnRefreshHistoryDB = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.refreshHistoryDB()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 02-RefreshHistoryDB.vbs...`,
        hashtags: ["history", "refreshHistoryDB"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\02-RefreshHistoryDB.vbs", [], { shell: true });

      this.refreshRoles();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/refreshHistoryDB`;
      const nextUrl = `${protocol}://${host}:${port}/history/refreshRoles`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.refreshHistoryDB()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "refreshHistoryDB"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 03-RefreshRoles
   */
  public refreshRoles: TFnRefreshRoles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.refreshRoles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 03-RefreshRoles.vbs...`,
        hashtags: ["history", "refreshRoles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\03-RefreshRoles.vbs", [], { shell: true });

      this.copyDataToMainReport();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/refreshRoles`;
      const nextUrl = `${protocol}://${host}:${port}/history/copyDataToMainReport`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.refreshRoles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "refreshRoles"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 05-CopyDataToMainReport
   */
  public copyDataToMainReport: TFnCopyDataToMainReport = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.copyDataToMainReport()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 05-CopyDataToMainReport.vbs...`,
        hashtags: ["history", "copyDataToMainReport"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\05-CopyDataToMainReport.vbs", [], { shell: true });

      this.consultingData();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/copyDataToMainReport`;
      const nextUrl = `${protocol}://${host}:${port}/history/consultingData`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.copyDataToMainReport()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "copyDataToMainReport"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 06-ConsultingData
   */
  public consultingData: TFnConsultingData = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.consultingData()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 06-ConsultingData_tes.vbs...`,
        hashtags: ["history", "consultingData"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\06-ConsultingData_tes.vbs", [], { shell: true });

      this.copyToInternalReportCC();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/consultingData`;
      const nextUrl = `${protocol}://${host}:${port}/history/copyToInternalReportCC`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.consultingData()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "consultingData"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 07-CopyToInternalReportCC
   */
  public copyToInternalReportCC: TFnCopyToInternalReportCC = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.copyToInternalReportCC()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 07-CopyToInternalReportCC.vbs...`,
        hashtags: ["history", "copyToInternalReportCC"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\07-CopyToInternalReportCC.vbs", [], { shell: true });

      this.copyToArchiv();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/copyToInternalReportCC`;
      const nextUrl = `${protocol}://${host}:${port}/history/copyToArchiv`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.copyToInternalReportCC()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "copyToInternalReportCC"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 08-CopyToArchiv
   */
  public copyToArchiv: TFnCopyToArchiv = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.copyToArchiv()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 08-CopyToArchiv.vbs...`,
        hashtags: ["history", "copyToArchiv"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\08-CopyToArchiv.vbs", [], { shell: true });

      this.countSeniorPivot();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/copyToArchiv`;
      const nextUrl = `${protocol}://${host}:${port}/history/countSeniorPivot`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.copyToArchiv()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "copyToArchiv"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 09-CountSeniorPivot
   */
  public countSeniorPivot: TFnCountSeniorPivot = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.countSeniorPivot()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 09-CountSeniorPivot.vbs...`,
        hashtags: ["history", "countSeniorPivot"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\09-CountSeniorPivot.vbs", [], { shell: true });

      this.makeGroupList();

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/countSeniorPivot`;
      const nextUrl = `${protocol}://${host}:${port}/history/makeGroupList`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.countSeniorPivot()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "countSeniorPivot"],
        restartUrl,
        nextUrl
      });
    }
  }

  /**
   * 11-MakeGroupList
   */
  public makeGroupList: TFnMakeGroupList = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.makeGroupList()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 11-MakeGroupList.vbs...`,
        hashtags: ["history", "makeGroupList"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\HistoryP_new\\11-MakeGroupList.vbs", [], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление History",
        place: "History.makeGroupList()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Обновление History завершено!`,
        hashtags: ["history", "makeGroupList", "historyComplete"]
      });

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/history/makeGroupList`;

      await this.TeleDroid.sendError({
        processName: "Обновление History",
        place: "History.makeGroupList()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "history", "makeGroupList"],
        restartUrl
      });
    }
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
      await replaceDataBetweenTables(this.db, "reportdb.vdates", "reportdb.dates", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vudateuserlist", "reportdb.udateuserlist", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vudateuserlisthead", "reportdb.udateuserlisthead", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vuserlistdaystruct", "reportdb.userlistdaystruct", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vuserlistdaystructfullname", "reportdb.userlistdaystructfullname", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vcasper_struct", "reportdb.casper_struct", "Обновление History");
    }

    // ACD
    const acd = async () => {
      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdline", "reportdb.uuseracdline", "Обновление History");
      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdprep", "reportdb.uuseracdprep", "Обновление History");
    }

    const cuvo = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoline", "reportdb.uusercuvoline", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvomailprep", "reportdb.uusercuvomailprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoonlineprep", "reportdb.uusercuvoonlineprep", "Обновление History")
      ]);
    }

    const crit = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsline", "reportdb.uusercriterroncallsline", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsline_ccb", "reportdb.uusercriterroncallsline_ccb", "Обновление History")
      ]);
    }

    const webtutor = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_detail", "reportdb.uuserwebtutor_detail", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_detail_mentors", "reportdb.uuserwebtutor_detail_mentors", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdline_exc_yar_ivan", "reportdb.uuseracdline_exc_yar_ivan", "Обновление History")
      ]);
    }

    const upsales = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolumeprep", "reportdb.uuupsalesvolumeprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep", "reportdb.uucbmoffersvolumeprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_crm", "reportdb.uucbmoffersvolumeprep_crm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn", "reportdb.uucbmoffersvolumeprep_conn", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn_crm", "reportdb.uucbmoffersvolumeprep_conn_crm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuucbmoffersvolumeprep_conn_crm_msk", "reportdb.uucbmoffersvolumeprep_conn_crm_msk", "Обновление History"),
      ]);
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusubgroup", "reportdb.uusubgroup", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserteleoptiagentinfo", "reportdb.userteleoptiagentinfo", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsprep", "reportdb.uuseraccidentsprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vmailsbyregionuserdate", "reportdb.mailsbyregionuserdate", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuupaymentsprep", "reportdb.uupaymentsprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatnotesnewprep", "reportdb.uurepeatnotesnewprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatsubnotes24_prep", "reportdb.uurepeatsubnotes24_prep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuseroutofdecret", "reportdb.useroutofdecret", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusertmexception", "reportdb.uusertmexception", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsprepwotechccb", "reportdb.uuseraccidentsprepwotechccb", "Обновление History")
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
        replaceDataBetweenTables(this.db, "reportdb.vuuseracd", "reportdb.uuseracd", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdallabonprep", "reportdb.uuseracdallabonprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdtm", "reportdb.uuseracdtm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseracdahttm", "reportdb.uuseracdahttm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercontactstm", "reportdb.uusercontactstm", "Обновление History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vuuseracdallabon", "reportdb.uuseracdallabon", "Обновление History");
    }

    // CuVo
    const cuvo = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvovip", "reportdb.uusercuvovip", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo611", "reportdb.uusercuvo611", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo636", "uusercuvo636", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvocdma", "uusercuvocdma", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo687q1wotech", "uusercuvo687q1wotech", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvo687q2", "uusercuvo687q2", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvomail", "reportdb.uusercuvomail", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercuvoonline", "reportdb.uusercuvoonline", "Обновление History")
      ]);
    }

    // Криты
    const crit = async () => {
      await replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoperprep", "reportdb.uusercriterroncallsoperprep", "Обновление History");

      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoper", "reportdb.uusercriterroncallsoper", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallstmprep", "reportdb.uusercriterroncallstmprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoperprep_ccb", "reportdb.uusercriterroncallsoperprep_ccb", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercrittelegram", "reportdb.uusercrittelegram", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritgplay", "reportdb.uusercritgplay", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritmail", "reportdb.uusercritmail", "Обновление History")
      ]);
    }

    // Соблюдение
    const adherence = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuseradherencedetail", "reportdb.uuseradherencedetail", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserabsenceprep", "reportdb.uuserabsenceprep", "Обновление History")
      ]);
    }

    // ДП
    const dp = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24tm_teststr", "reportdb.uuserconn24tm_teststr", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24preptm", "reportdb.uuserconn24preptm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vservidlistdatavas_numumbupsale", "reportdb.servidlistdatavas_numumbupsale", "Обновление History")
      ]);
    }

    const accidents = async () => {
      const rowsCount: number = await getRowsCount(this.db, "reportdb.uuseraccidentsprep");

      if (rowsCount > 0) {
        await Promise.all([
          replaceDataBetweenTables(this.db, "reportdb.vuuseraccidents", "reportdb.uuseraccidents", "Обновление History"),
          replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentsmass", "reportdb.uuseraccidentsmass", "Обновление History")
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
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_workday", "reportdb.rtmschedule_workday", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday611", "reportdb.rtmscheduleday611", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday614", "reportdb.rtmscheduleday614", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday636", "reportdb.rtmscheduleday636", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduleday_claims", "reportdb.rtmscheduleday_claims", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmscheduledaymnp", "reportdb.rtmscheduledaymnp", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmtraff_day", "reportdb.rtmtraff_day", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmtraff_day_nocc", "reportdb.rtmtraff_day_nocc", "Обновление History")
      ]);
    }

    const upsales = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume", "reportdb.uuupsalesvolume", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume_conn", "reportdb.uupsalesvolume_conn", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuupsalesvolume_conn_msk", "reportdb.uupsalesvolume_conn_msk", "Обновление History")
      ]);
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusertminterviews", "reportdb.uusertminterviews", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserstafftime", "reportdb.uuserstafftime", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnpout", "reportdb.uusermnpout", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnpinnewtt", "reportdb.uusermnpinnewtt", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vmailsbyuserdate", "reportdb.mailsbyuserdate", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserchats_prep", "reportdb.uuserchats_prep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutorprep", "reportdb.uuserwebtutorprep", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutorprep_mentors", "reportdb.uuserwebtutorprep_mentors", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserroles", "reportdb.userroles", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuserroles_prep", "reportdb.userroles_prep", "Обновление History")
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
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallstm", "reportdb.uusercriterroncallstm", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercritintarget", "reportdb.uusercritintarget", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusercriterroncallsoper_ccb", "reportdb.uusercriterroncallsoper_ccb", "Обновление History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vuuserevalsintarget", "reportdb.uuserevalsintarget", "Обновление History");
    }

    // Соблюдение
    const adherence = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuseradherence", "reportdb.uuseradherence", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserabsence", "reportdb.uuserabsence", "Обновление History")
      ]);
    }

    // ДП
    const dp = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuuserconn24preptmstr", "reportdb.uuserconn24preptmstr", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusereff", "reportdb.uusereff", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusereffb2b", "reportdb.uusereffb2b", "Обновление History")
      ]);

      const rowsCount: number = await getRowsCount(this.db, "reportdb.uuserconn24preptm");

      if (rowsCount > 0) {
        await replaceDataBetweenTables(this.db, "reportdb.vuuserconn24tm", "reportdb.uuserconn24tm", "Обновление History");
      } else {
        await refreshDateIdUserOnError("uuserconn24tm");
      }
    }

    // Расписание
    const schedule = async () => {
      await Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day", "reportdb.rtmschedule_traff_day", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day_nocc", "reportdb.rtmschedule_traff_day_nocc", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vrtmsl_mistake", "reportdb.rtmsl_mistake", "Обновление History")
      ]);

      await replaceDataBetweenTables(this.db, "reportdb.vrtmschedule_traff_day_struct", "reportdb.rtmschedule_traff_day_struct", "Обновление History");
    }

    // Разное
    const other = () => {
      Promise.all([
        replaceDataBetweenTables(this.db, "reportdb.vuusermails", "reportdb.uusermails", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserchats", "reportdb.uuserchats", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor", "reportdb.uuserwebtutor", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuserwebtutor_mentors", "reportdb.uuserwebtutor_mentors", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuupayments", "reportdb.uupayments", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuurepeatnotesnew", "reportdb.uurepeatnotesnew", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuusermnphold", "reportdb.uusermnphold", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vdataevalonlinechannels_report_all", "reportdb.dataevalonlinechannels_report_all", "Обновление History"),
        replaceDataBetweenTables(this.db, "reportdb.vuuseraccidentswotechccb", "reportdb.uuseraccidentswotechccb", "Обновление History")
      ]);
    }

    await Promise.all([
      crit(),
      adherence(),
      dp(),
      schedule(),
      other()
    ]);

    this.refreshHistoryDB();

    return true;
  }
}