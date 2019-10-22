import { Main } from "@classes";
import {
  TFnUpdate,
  TFnCollectDataFiles,
  TFnCopyDataNew,
  TFnCopyDataOld,
  TFnHideSheetsNew,
  TFnHideSheetsOld,
  TFnRefreshAndCopyFiles,
  TFnCopyNewToARES
} from "./@types";
import { cmd } from "@utils";
import moment from "moment";

export default class DevelopmentMP extends Main {
  constructor() {
    super();
  }

  public update: TFnUpdate = async () => {
    await this.TeleDroid.sendToLogsNew({
      processName: "Обновление МП службы развития",
      place: "DevelopmentMP.update()",
      date: moment().format("DD.MM.YYYY"),
      time: moment().format("HH:mm"),
      message: "Начинается обновление файлов МП службы развития...",
      hashtags: ["mp", "development", "update"]
    });

    this.collectDataFiles();

    return true;
  }

  public collectDataFiles: TFnCollectDataFiles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.collectDataFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 01-CollectDataFiles.vbs...`,
        hashtags: ["mp", "development", "copyDataFiles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\01-CollectDataFiles.vbs", [], { shell: true });

      this.copyDataNew();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/collectDataFiles`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/copyDataNew`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.collectDataFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "collectDataFiles"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyDataNew: TFnCopyDataNew = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.copyDataNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 03-CopyDataNew.vbs...`,
        hashtags: ["mp", "operators", "copyDataNew"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\03-CopyDataNew.vbs", [], { shell: true });

      this.copyDataOld();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/copyDataNew`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/copyDataOld`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.copyDataNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "copyDataNew"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyDataOld: TFnCopyDataOld = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.copyDataOld()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 03-CopyDataOld.vbs...`,
        hashtags: ["mp", "operators", "copyDataOld"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\03-CopyDataOld.vbs", [], { shell: true });

      this.hideSheetsNew();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/copyDataOld`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/hideSheetsNew`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.copyDataOld()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "copyDataOld"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public hideSheetsNew: TFnHideSheetsNew = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.hideSheetsNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 05-HideSheetsNew.vbs...`,
        hashtags: ["mp", "operators", "hideSheetsNew"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\05-HideSheetsNew.vbs", [], { shell: true });

      this.hideSheetsOld();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/hideSheetsNew`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/hideSheetsOld`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.hideSheetsNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "hideSheetsNew"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public hideSheetsOld: TFnHideSheetsOld = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.hideSheetsOld()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 05-HideSheetsOld.vbs...`,
        hashtags: ["mp", "operators", "hideSheetsOld"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\05-HideSheetsOld.vbs", [], { shell: true });

      this.refreshAndCopyFiles();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/hideSheetsOld`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/refreshAndCopyFiles`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.hideSheetsOld()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "hideSheetsOld"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public refreshAndCopyFiles: TFnRefreshAndCopyFiles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.refreshAndCopyFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 02-RefreshAndCopyFiles.vbs...`,
        hashtags: ["mp", "operators", "refreshAndCopyFiles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\02-RefreshAndCopyFiles.vbs", [], { shell: true });

      this.copyNewToARES();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/refreshAndCopyFiles`;
      const nextUrl = `${protocol}://${host}:${port}/mp/development/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.refreshAndCopyFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "refreshAndCopyFiles"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyNewToARES: TFnCopyNewToARES = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "DevelopmentMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 07-CopyNewToARES.vbs...`,
        hashtags: ["mp", "operators", "copyNewToARES"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\Development\\07-CopyNewToARES.vbs", [], { shell: true });
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/development/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление МП службы развития",
        place: "DevelopmentMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "development", "copyNewToARES"],
        restartUrl
      });
    }

    return true;
  }
}