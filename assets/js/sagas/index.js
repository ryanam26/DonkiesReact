import { take, fork } from "redux-saga/effects";
import history from "~Scripts/history";

import { NAVIGATE } from "~Scripts/constants/actions";

function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(NAVIGATE.PUSH);
    yield history.push(pathname);
  }
}

export default function* root() {
  yield [fork(watchNavigate)];
}
