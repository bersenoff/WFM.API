import History from "../API/History/routes";
import System from "../API/System/routes";
import Tasks from "../API/Tasks/routes";

export default [
  ...History,
  ...System,
  ...Tasks
];