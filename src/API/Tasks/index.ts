import { Main } from "@classes";
import { TFnUpdateUsersStruct, TFnUpdateRegionsStruct, TFnRefreshReports } from "./@types";
import { cmd } from "@utils";
import moment from "moment";
import fs from "fs";

export default class Tasks extends Main {
  constructor() {
    super();
  }

  /**
   * Обновление региональной структуры
   */
  public updateRegionsStruct: TFnUpdateRegionsStruct = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление региональной структуры",
        place: "Tasks.updateRegionsStruct()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается рассчет региональной структуры...`,
        hashtags: ["updateRegionsStruct"]
      });

      await cmd("cscript D:\\SQLReporting\\test\\VBScripts\\CountRegionStruct.vbs", [], { shell: true });

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/tasks/updateRegionsStruct`;

      await this.TeleDroid.sendError({
        processName: "Обновление региональной структуры",
        place: "Tasks.updateRegionsStruct()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "updateRegionsStruct"],
        restartUrl
      });
    }
  }

  /**
   * Обновление пользовательской структуры
   */
  public updateUsersStruct: TFnUpdateUsersStruct = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление пользовательской структуры",
        place: "Tasks.updateUsersStruct()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается рассчет пользовательской структуры...`,
        hashtags: ["updateUsersStruct"]
      });

      await cmd("cscript D:\\SQLReporting\\test\\VBScripts\\CountUsersStructYear.vbs", [], { shell: true });

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/tasks/updateUsersStruct`;

      await this.TeleDroid.sendError({
        processName: "Обновление пользовательской структуры",
        place: "Tasks.updateUsersStruct()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "updateUsersStruct"],
        restartUrl
      });
    }
  }

  /**
   * Обновление отчетов
   */
  public refreshReports: TFnRefreshReports = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление Excel-отчетов",
        place: "Tasks.refreshReports()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается обновление Excel-отчетов...`,
        hashtags: ["refreshReports"]
      });

      const reports: any[] = [
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\GOZ_Evals.xlsx",
          target: "\\\\t2ru\\zrfolders\\InternalReportCC\\B2B admin\\GOZ_Evals.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\GOZ_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\GOZ_Evals_Monitoring.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\Online_Evals.xlsx",
          target: "\\\\t2ru\\zrfolders\\Report_CC\\Отчеты по прослушке\\Online_Evals.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\Online_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\Online_Evals_Monitoring.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\TT_Evals.xlsx",
          target: "\\\\t2ru\\zrfolders\\InternalReportCC\\Оценка ТТ от мониторинга\\TT_Evals.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\TT_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\TT_Evals_Monitoring.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\SM_Evals.xlsx",
          target: "\\\\t2ru\\zrfolders\\InternalReportCC\\SM_Evals.xlsx",
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\SM_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\SM_Evals_Monitoring.xlsx"
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\AppStore_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\AppStore_Evals_Monitoring.xlsx"
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\MNP_Evals_Monitoring.xlsx",
          target: "\\\\t2ru\\zrfolders\\Monitoring Personal\\MNP_Evals_Monitoring.xlsx"
        },
        {
          source: "\\\\t2ru\\zrfolders\\WFM-Reports\\Day\\ARES\\MNP_Evals.xlsx",
          target: "\\\\t2ru\\zrfolders\\InternalReportCC\\MNP_Evals.xlsx"
        }
      ];

      for (let report of reports) {
        await this.TeleDroid.sendToLogsNew({
          processName: "Обновление Excel-отчетов",
          place: "Tasks.refreshReports()",
          date: moment().format("DD.MM.YYYY"),
          time: moment().format("HH:mm"),
          message: `Обновление ${report.source}...`,
          hashtags: ["refreshReports"]
        });

        await cmd("cscript refreshReport.vbs", [report.source], { cwd: `${process.env.APP_ROOT}/src/scripts`, shell: true });

        await this.TeleDroid.sendToLogsNew({
          processName: "Обновление Excel-отчетов",
          place: "Tasks.refreshReports()",
          date: moment().format("DD.MM.YYYY"),
          time: moment().format("HH:mm"),
          message: `Копирование ${report.source} в ${report.target}...`,
          hashtags: ["refreshReports"]
        });

        fs.createReadStream(report.source).pipe(fs.createWriteStream(report.target));
      }

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление Excel-отчетов",
        place: "Tasks.refreshReports()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Обновление Excel-отчетов завершено!`,
        hashtags: ["refreshReports"]
      });

      return true;
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/tasks/refreshReports`;

      await this.TeleDroid.sendError({
        processName: "Обновление Excel-отчетов",
        place: "Tasks.refreshReports()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "refreshReports"],
        restartUrl
      });
    }
  }
}