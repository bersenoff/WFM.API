import { getRouter } from "@utils";
import { History } from "../"

const update = getRouter("/history/update", async () => await History.update());
const killExcel = getRouter("/history/killExcel", async () => await History.killExcel());
const countAresData = getRouter("/history/countAresData", async () => await History.countAresData());
const countUsersKPIs = getRouter("/history/countUsersKPIs", async () => await History.countUsersKPIs());
const refreshHistoryDB = getRouter("/history/refreshHistoryDB", async () => await History.refreshHistoryDB());
const refreshRoles = getRouter("/history/refreshRoles", async () => await History.refreshRoles());
const copyDataToMainReport = getRouter("/history/copyDataToMainReport", async () => await History.copyDataToMainReport());
const copyToInternalReportCC = getRouter("/history/copyToInternalReportCC", async () => await History.copyToInternalReportCC());
const copyToArchiv = getRouter("/history/copyToArchiv", async () => await History.copyToArchiv());
const countSeniorPivot = getRouter("/history/countSeniorPivot", async () => await History.countSeniorPivot());
const makeGroupList = getRouter("/history/makeGroupList", async () => await History.makeGroupList());

export default [
  update,
  killExcel,
  countAresData,
  countUsersKPIs,
  refreshHistoryDB,
  refreshRoles,
  copyDataToMainReport,
  copyToInternalReportCC,
  copyToArchiv,
  countSeniorPivot,
  makeGroupList
];