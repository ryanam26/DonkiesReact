import { take, put, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { REGISTRATION_PARENT_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

function* registartionParent(form) {
  const result = yield call(apiCall, REGISTRATION_PARENT_URL, "POST", form);
  if (result.isError) {
    yield put({
      type: USER.REGISTRATION.ERROR,
      payload: result.data
    });
  } else {
    yield put({ type: USER.REGISTRATION.SUCCESS });
  }
}

function* watchRegistrationParent() {
  while (true) {
    const { form } = yield take(USER.REGISTRATION_PARENT);
    yield fork(registartionParent, form);
  }
}

export default watchRegistrationParent;
