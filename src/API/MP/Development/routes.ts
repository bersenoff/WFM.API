import { getRouter } from "@utils";
import { DevelopmentMP } from "../../";

const update = getRouter("/mp/development/update", async () => DevelopmentMP.update());
const collectDataFiles = getRouter("/mp/development/collectDataFiles", async () => DevelopmentMP.collectDataFiles());
const copyDataNew = getRouter("/mp/development/copyDataNew", async () => DevelopmentMP.copyDataNew());
const copyDataOld = getRouter("/mp/development/copyDataOld", async () => DevelopmentMP.copyDataOld());
const hideSheetsNew = getRouter("/mp/development/hideSheetsNew", async () => DevelopmentMP.hideSheetsNew());
const hideSheetsOld = getRouter("/mp/development/hideSheetsOld", async () => DevelopmentMP.hideSheetsOld());
const refreshAndCopyFiles = getRouter("/mp/development/refreshAndCopyFiles", async () => DevelopmentMP.refreshAndCopyFiles());
const copyNewToARES = getRouter("/mp/development/copyNewToARES", async () => DevelopmentMP.copyNewToARES());

export default [
  update,
  collectDataFiles,
  copyDataNew,
  copyDataOld,
  hideSheetsNew,
  hideSheetsOld,
  refreshAndCopyFiles,
  copyNewToARES
];