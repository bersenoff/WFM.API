/**
 * Получить количество строк в таблице
 */

import { Sequelize } from "sequelize";

export default async (db: Sequelize, tableName: string) => {
  const data: any = await db.query(`SELECT COUNT(*) FROM ${tableName}`);

  return data[0].length;
}