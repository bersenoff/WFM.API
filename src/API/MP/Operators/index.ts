import { Main } from "@classes";
import {
  TFnUpdate,
  TFnCopyDataNew,
  TFnCopyNewToSelfControl,
  TFnCopyNewToNewKPI,
  TFnCopyNewToARES,
  TFnCollectDataFiles
} from "./@types";
import moment from "moment";
import axios from "axios";
import { cmd } from "@utils";

export default class OperatorsMP extends Main {
  constructor() {
    super();
  }

  public update: TFnUpdate = async () => {
    await this.TeleDroid.sendToLogsNew({
      processName: "Обновление операторской МП",
      place: "OperatorsMP.update()",
      date: moment().format("DD.MM.YYYY"),
      time: moment().format("HH:mm"),
      message: "Начинается обновление файлов операторской МП...",
      hashtags: ["mp", "operators", "update"]
    });

    this.collectDataFiles();
    return true;
  }

  public collectDataFiles: TFnCollectDataFiles = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.collectDataFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 01-CollectDataFiles.vbs...`,
        hashtags: ["mp", "operators", "copyDataFiles"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OperMotivation\\01-CollectDataFiles_new.vbs", [], { shell: true });

      this.copyDataNew();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/operators/collectDataFiles`;
      const nextUrl = `${protocol}://${host}:${port}/mp/operators/copyDataNew`;

      await this.TeleDroid.sendError({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.collectDataFiles()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "operators", "copyDataFiles"],
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
        place: "OperatorsMP.copyDataNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 02-CopyDataNew.vbs...`,
        hashtags: ["mp", "operators", "copyDataNew"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OperMotivation\\02-CopyDataNew.vbs", [], { shell: true });

      this.copyNewToSelfControl();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/operators/copyDataNew`;
      const nextUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToSelfControl`;

      await this.TeleDroid.sendError({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyDataNew()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "operators", "copyDataNew"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyNewToSelfControl: TFnCopyNewToSelfControl = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToSelfControl()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 03-CopyNewToSelfControl.vbs...`,
        hashtags: ["mp", "operators", "copyNewToSelfControl"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OperMotivation\\03-CopyNewToSelfControl.vbs", [], { shell: true });

      this.copyNewToNewKPI();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToSelfControl`;
      const nextUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToNewKPI`;

      await this.TeleDroid.sendError({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToSelfControl()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "operators", "copyNewToSelfControl"],
        restartUrl,
        nextUrl
      });
    }

    return true;
  }

  public copyNewToNewKPI: TFnCopyNewToNewKPI = async () => {
    try {
      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToNewKPI()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 04-CopyNewToNewKPI.vbs...`,
        hashtags: ["mp", "operators", "copyNewToNewKPI"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OperMotivation\\04-CopyNewToNewKPI.vbs", [], { shell: true });

      this.copyNewToARES();
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToNewKPI`;
      const nextUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToNewKPI()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "operators", "copyNewToNewKPI"],
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
        place: "OperatorsMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Запускается скрипт 07-CopyNewToARES.vbs...`,
        hashtags: ["mp", "operators", "copyNewToARES"]
      });

      await cmd("cscript X:\\WFM-Reports\\Day\\Motivation\\OperMotivation\\07-CopyNewToARES.vbs", [], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: "Обновление файлов операторской МП успешно завершено!",
        hashtags: ["mp", "operators", "copyNewToARES"]
      });
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/mp/operators/copyNewToARES`;

      await this.TeleDroid.sendError({
        processName: "Обновление операторской МП",
        place: "OperatorsMP.copyNewToARES()",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "mp", "operators", "copyNewToARES"],
        restartUrl
      });
    }

    return true;
  }
}