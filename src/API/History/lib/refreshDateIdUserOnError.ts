/**
 * Legacy подход к обновлению таблиц при отсутствии данных
 */

import db from "../../../Models";

export default async (tableName: string) => {
  await db.query(`
    INSERT IGNORE INTO ${tableName} (date, iduser)
    SELECT
      t1.date,
      t1.iduser
    FROM reportdb.userlistdaystruct t1
    LEFT JOIN ${tableName} t2 ON t1.date = t2.date
      AND t1.iduser = t2.iduser
    WHERE t2.date IS NULL
  `);

  await db.query(`
    DELETE FROM ${tableName}
    WHERE CONCAT_WS("/", date, iduser) IN (
      SELECT * FROM (
        SELECT 
          CONCAT_WS("/", t1.date, t1.iduser)
        FROM ${tableName} t1
        LEFT JOIN reportdb.userlistdaystruct t2 ON t1.date = t2.date
          AND t1.iduser = t2.iduser
        WHERE t2.date IS NULL
      ) as tt
    )
  `);
}