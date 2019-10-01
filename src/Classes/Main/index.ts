/**
 * @description Базовый класс
 * @author Nikita Bersenev
 */

import db from "../../Models";
import TeleDroid from "./TeleDroid";

export default class Main {
  db: any;
  TeleDroid: typeof TeleDroid;

  constructor() {
    this.db = db;
    this.TeleDroid = TeleDroid;
  }
}
