import { getRouter } from "@utils";
import { OperatorsMP } from "../../";

const update = getRouter("/mp/OperatorsMP/update", async () => await OperatorsMP.update());
const collectDataFiles = getRouter("/mp/OperatorsMP/collectDataFiles", async () => await OperatorsMP.collectDataFiles());
const copyDataNew = getRouter("/mp/OperatorsMP/copyDataNew", async () => await OperatorsMP.copyDataNew());
const copyNewToSelfControl = getRouter("/mp/OperatorsMP/copyNewToSelfControl", async () => await OperatorsMP.copyNewToSelfControl());
const copyNewToNewKPI = getRouter("/mp/OperatorsMP/copyNewToNewKPI", async () => await OperatorsMP.copyNewToNewKPI());
const copyNewToARES = getRouter("/mp/OperatorsMP/copyNewToARES", async () => await OperatorsMP.copyNewToARES());

export default [
  update,
  collectDataFiles,
  copyDataNew,
  copyNewToSelfControl,
  copyNewToNewKPI,
  copyNewToARES
];