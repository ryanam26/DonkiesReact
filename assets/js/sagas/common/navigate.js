import { take } from "redux-saga/effects";

import { NAVIGATE } from "~Scripts/constants/actions";
import history from "~Scripts/history";

function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(NAVIGATE.PUSH);
    yield history.push(pathname);
  }
}

export default [watchNavigate];
