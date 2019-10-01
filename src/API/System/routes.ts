import { getRouter } from "@utils";
import { System } from "../";

const killExcel = getRouter("/system/killExcel", async () => await System.killExcel());

export default [
  killExcel
];