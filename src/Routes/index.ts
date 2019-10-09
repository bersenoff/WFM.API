import History from "../API/History/routes";
import MP from "../API/MP/routes";
import System from "../API/System/routes";
import Tasks from "../API/Tasks/routes";

export default [
  ...History,
  ...MP,
  ...System,
  ...Tasks
];