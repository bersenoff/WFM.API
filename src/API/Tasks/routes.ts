import { getRouter } from "@utils";
import { Tasks } from "../";

const updateRegionsStruct = getRouter("/tasks/updateRegionsStruct", async () => await Tasks.updateRegionsStruct());
const updateUsersStruct = getRouter("/tasks/updateUsersStruct", async () => await Tasks.updateUsersStruct());
const refreshReports = getRouter("/tasks/refreshReports", async () => await Tasks.refreshReports());

export default [
  updateRegionsStruct,
  updateUsersStruct,
  refreshReports
];