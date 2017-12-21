import { take, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { LOGOUT_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

function* logout() {
  yield call(apiCall, LOGOUT_URL, "GET", {});
}

function* watchLogout() {
  while (true) {
    yield take(USER.LOGOUT);
    yield fork(logout);
  }
}

export default watchLogout;
