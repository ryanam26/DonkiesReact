import { take, put, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { CHANGE_PASSWORD_URL, USER_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Change password

function* changePassword(form) {
  yield put({ type: USER.CHANGE_PASSWORD.REQUEST });

  const result = yield call(apiCall, CHANGE_PASSWORD_URL, "POST", form, true);

  if (result.isError) {
    yield put({
      type: USER.CHANGE_PASSWORD.ERROR,
      payload: result.data
    });
    return;
  }

  yield put({ type: USER.CHANGE_PASSWORD.SUCCESS, payload: result.data });
}

export function* watchChangePassword() {
  while (true) {
    const { form } = yield take(USER.CHANGE_PASSWORD.SUBMIT);
    yield fork(changePassword, form);
  }
}

// ------- Edit profile

function* editProfile(form) {
  yield put({ type: USER.EDIT_PROFILE.REQUEST });

  const result = yield call(apiCall, USER_URL, "PUT", form, true);

  if (result.isError) {
    yield put({ type: USER.EDIT_PROFILE.ERROR, payload: result.data });
    return;
  }

  yield put({ type: USER.EDIT_PROFILE.SUCCESS, payload: result.data });
  yield apiGet("user", {}, USER_URL);
}

export function* watchEditProfile() {
  while (true) {
    const { form } = yield take(USER.EDIT_PROFILE.SUBMIT);
    yield fork(editProfile, form);
  }
}

export default [watchChangePassword, watchEditProfile];
