require("dotenv").config();
import "source-map-support/register";
import "module-alias/register";
import express, { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./Routes";

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
  }
}

new Server().start(Number(process.env.PORT));