/**
 * Системные методы
 */

import { Main } from "@classes";
import { TFnKillExcel } from "./@types";
import { cmd } from "@utils";
import moment from "moment";

export default class System extends Main {
  constructor() {
    super();
  }

  /**
   * Убийство Excel под текущей учеткой
   */
  public killExcel: TFnKillExcel = async () => {
    try {
      const result: any = await cmd("powershell.exe", [`${process.env.APP_ROOT}/src/Scripts/getCurrentUserName.ps1`], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        place: "System.killExcel",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Закрываю все Excel-процессы под учетной записью ${result[0].replace("\n", "")}...`,
        hashtags: ["killExcel"]
      });

      await cmd("powershell.exe", [`${process.env.APP_ROOT}/src/Scripts/killExcel.ps1`], { shell: true });

      await this.TeleDroid.sendToLogsNew({
        place: "System.killExcel",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: `Все Excel-процессы успешно закрыты!`,
        hashtags: ["killExcel"]
      });
    } catch (err) {
      let error = (typeof err === "string") ? err : err.message;

      const protocol = process.env.APP_PROTOCOL;
      const host = process.env.APP_HOST;
      const port = process.env.APP_PORT;
      const restartUrl = `${protocol}://${host}:${port}/system/killExcel`;

      await this.TeleDroid.sendError({
        place: "System.killExcel",
        date: moment().format("DD.MM.YYYY"),
        time: moment().format("HH:mm"),
        message: error,
        hashtags: ["error", "killExcel"],
        restartUrl
      });
    }

    return true;
  }
}