require("dotenv").config();
import "source-map-support/register";
import "module-alias/register";
import express, { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./Routes";
import { CronJob } from "cron";
import { History, Tasks } from "./API";

class Server {
  app: Application;

  constructor() {
    this.app = express();

    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.routing();
  }

  public routing: () => void = () => {
    routes.forEach(route => this.app.use(route));
  }

  public start: (port: number) => void = (port) => {
    this.app.listen(port);
    console.log(`Сервер запущен на ${port} порту...`);

    new CronJob("0 30 0 * * *", () => {
      Tasks.updateRegionsStruct();
      Tasks.refreshReports();
    }, null, true, "Europe/Moscow");

    new CronJob("0 0 3 * * *", () => {
      History.update();
    }, null, true, "Europe/Moscow");

    new CronJob("0 30 7 * * *", () => {
      History.update();
    }, null, true, "Europe/Moscow");

    new CronJob("0 30 15 * * *", () => {
      // History.update();
      Tasks.updateUsersStruct();
    }, null, true, "Europe/Moscow");
  }
}

new Server().start(Number(process.env.APP_PORT));