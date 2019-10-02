/**
 * @description Методы для взаимодействия с ботом
 */

import axios from "axios";

class TeleDroid {
  url: string;

  constructor() {
    this.url = process.env.TELEDROID_URL;
  }

  /**
   * Отправка сообщения в группу с логами
   */
  public async sendToLogs(message: string) {
    try {
      const res = await axios({
        method: "POST",
        url: `${this.url}/messages/sendToLogs`,
        data: { message }
      });

      return res.data;
    } catch (err) { console.log(err.response.data.error); }
  }

  /**
   * Отправка сообщения в общую группу
   */
  public async sendToGroup(message: string) {
    try {
      const res = await axios({
        method: "POST",
        url: `${this.url}/messages/sendToGroup`,
        data: { message }
      });

      return res.data;
    } catch (err) { console.log(err.message); }
  }

  /**
   * Отправка сообщения в группу с логами в новом формате
   */
  public async sendToLogsNew({
    processName,
    place,
    date,
    time,
    message,
    hashtags
  }: {
    processName?: string,
    place: string,
    date: string,
    time: string,
    message: string,
    hashtags: string[]
  }) {
    try {
      const res = await axios({
        method: "POST",
        url: `${this.url}/messages/sendToLogsNew`,
        data: {
          process: processName,
          service: process.env.APP_NAME,
          place,
          date,
          time,
          message,
          hashtags
        }
      });
      return res.data;
    } catch (err) {
      if (typeof err.reponse !== "undefined") {
        console.log(err.reponse.data);
      } else {
        console.log(err);
      }
    }
  }

  /**
   * Отправка ошибок
   */
  public async sendError({
    processName,
    place,
    date,
    time,
    message,
    hashtags,
    restartUrl,
    nextUrl
  }: {
    processName?: string,
    place: string,
    date: string,
    time: string,
    message: string,
    hashtags: string[],
    restartUrl?: string,
    nextUrl?: string
  }) {
    try {
      var res = await axios({
        method: "POST",
        url: `${this.url}/messages/sendError`,
        data: {
          process: processName,
          service: process.env.APP_NAME,
          place,
          date,
          time,
          message,
          hashtags,
          restartUrl,
          nextUrl
        }
      });

      return res.data;
    } catch (err) {
      if (typeof err.reponse !== "undefined") {
        console.log(err.reponse.data);
      } else {
        console.log(err);
      }
    }
  }
}

export default new TeleDroid();