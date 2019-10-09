import { getRouter } from "@utils";
import { Operators } from "../../";

const update = getRouter("/mp/operators/update", async () => await Operators.update());
const collectDataFiles = getRouter("/mp/operators/collectDataFiles", async () => await Operators.collectDataFiles());
const copyDataNew = getRouter("/mp/operators/copyDataNew", async () => await Operators.copyDataNew());
const copyNewToSelfControl = getRouter("/mp/operators/copyNewToSelfControl", async () => await Operators.copyNewToSelfControl());
const copyNewToNewKPI = getRouter("/mp/operators/copyNewToNewKPI", async () => await Operators.copyNewToNewKPI());
const copyNewToARES = getRouter("/mp/operators/copyNewToARES", async () => await Operators.copyNewToARES());

export default [
  update,
  collectDataFiles,
  copyDataNew,
  copyNewToSelfControl,
  copyNewToNewKPI,
  copyNewToARES
];