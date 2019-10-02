import { getRouter } from "@utils";
import { History } from "../";

const update = getRouter("/history/update", async () => await History.update());

const killExcel = getRouter("/history/killExcel", async () => await History.killExcel());
const countAresData = getRouter("/history/countAresData", async () => await History.countAresData());
const countUsersKPIs = getRouter("/history/countUsersKPIs", async () => await History.countUsersKPIs());

export default [
  update,
  killExcel,
  countAresData,
  countUsersKPIs
];