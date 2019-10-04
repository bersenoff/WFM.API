/**
 * Перенос данных из одной таблицы в другую
 */

import { Sequelize } from "sequelize";
import { TeleDroid } from "@classes";
import moment from "moment";

export default async (db: Sequelize, srcTable: string, trgTable: string, process?: string) => {
  TeleDroid.sendToLogsNew({
    processName: process,
    place: "replaceDataBetweenTables",
    date: moment().format("DD.MM.YYYY"),
    time: moment().format("HH:mm"),
    message: `Перенос данных: ${srcTable} -> ${trgTable}\n\n`,
    hashtags: ["replaceDataBetweenTables"]
  });

  try {
    await db.query(`TRUNCATE TABLE ${trgTable}`);

    await db.query(`
      INSERT IGNORE INTO ${trgTable}
      SELECT * FROM ${srcTable}
    `);
  } catch (err) {
    TeleDroid.sendError({
      processName: process,
      place: "replaceDataBetweenTables",
      date: moment().format("DD.MM.YYYY"),
      time: moment().format("HH:mm"),
      message: err.message,
      hashtags: ["replaceDataBetweenTables"]
    });
  }

  return true;
}