import { take, put, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { LOGIN_URL, LOGIN_FACEBOOK_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

/*
 * Main login
 */

function* login(email, password) {
  let data = { email, password };
  const result = yield call(apiCall, LOGIN_URL, "POST", data);
  if (result.isError) {
    yield put({ type: USER.LOGIN.ERROR, payload: result.data });
  } else {
    yield put({ type: USER.LOGIN.SUCCESS, payload: result.data.token });
  }
}

function* watchLogin() {
  while (true) {
    const { email, password } = yield take(USER.LOGIN.SUBMIT);
    yield fork(login, email, password);
  }
}

/*
 * Facebook login
 */

function* loginFacebook(code) {
  let data = { code };
  const result = yield call(apiCall, LOGIN_FACEBOOK_URL, "POST", data);
  if (result.isError) {
    yield put({ type: USER.LOGIN.ERROR, payload: result.data });
  } else {
    yield put({ type: USER.LOGIN.SUCCESS, payload: result.data.token });
  }
}

function* watchLoginFacebook() {
  while (true) {
    const { code } = yield take(USER.LOGIN_FACEBOOK);
    yield fork(loginFacebook, code);
  }
}

export default [watchLogin, watchLoginFacebook];
