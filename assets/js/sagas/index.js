import { fork } from "redux-saga/effects";

import accounts from "./accounts";
import common from "./common";
import items from "./items";
import lenders from "./lenders";
import user from "./user";

let forkedFunctions = [
  ...common,
  ...accounts,
  ...items,
  ...lenders,
  ...user
].map(item => fork(item));

export default function* root() {
  yield forkedFunctions;
}
