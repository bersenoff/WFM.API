import { Sequelize } from "sequelize";

export default new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  pool: {
    max: 40,
    min: 0,
    idle: 10000,
    acquire: 60000
  },
  timezone: "+03:00",
  logging: false,
});