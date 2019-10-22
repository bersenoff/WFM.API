import { Main } from "@classes";
import {
  TFnUpdate,
  TFnCollectDataFiles,
  TFnRefreshAndCopyFiles,
  TFnCopyNewToARES
} from "./@types";
import moment from "moment";
import { cmd } from "@utils";

export default class OBOMP extends Main {
  constructor() {
    super();
  }

  public update: TFnUpdate = async () => {
    await this.TeleDroid.sendToLogsNew({
      processName: "Обновление МП ОБО",
      place: "OBOMP.update()",
      date: moment().format("DD.MM.YYYY"),
      time: moment().format("HH:mm"),
      message: "Начинается обновление файлов МП ОБО...",
      hashtags: ["mp", "obo", "update"]
    });

    this.collectDataFiles();

    return true;
  }

  public collectDataFiles: TFnCollectDataFiles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление МП ОБО",
        place: "OBOMP.collectDataFiles",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 01-CollectDataFiles.vbs...`,
        hashtags: ["mp", "obo", "collectDataFiles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OBO\\01-CollectDataFiles.vbs", [], { shell: true });

      this.refreshAndCopyFiles();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/obo/collectDataFiles`;
      const nextUrl = `${protocol}://${host}:${port}/mp/obo/refreshAndCopyFiles`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП ОБО",
        place: "OBOMP.collectDataFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "obo", "copyDataFiles"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public refreshAndCopyFiles: TFnRefreshAndCopyFiles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление МП ОБО",
        place: "OBOMP.refreshAndCopyFiles",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 02-RefreshAndCopyFiles.vbs...`,
        hashtags: ["mp", "obo", "refreshAndCopyFiles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OBO\\02-RefreshAndCopyFiles.vbs", [], { shell: true });

      this.copyNewToARES();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/obo/refreshAndCopyFiles`;
      const nextUrl = `${protocol}://${host}:${port}/mp/obo/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП ОБО",
        place: "OBOMP.refreshAndCopyFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "obo", "refreshAndCopyFiles"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyNewToARES: TFnCopyNewToARES = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление МП ОБО",
        place: "OBOMP.copyNewToARES",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 03-CopyNewToARES.vbs...`,
        hashtags: ["mp", "obo", "copyNewToARES"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OBO\\03-CopyNewToARES.vbs", [], { shell: true });
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/obo/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП ОБО",
        place: "OBOMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "obo", "copyNewToARES"],
        restartUrl
      });
    }

    return true;
  }
}