import { take, put, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { REGISTRATION_STEP1_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

function* registrationStep1(form) {
  const result = yield call(apiCall, REGISTRATION_STEP1_URL, "POST", form);
  if (result.isError) {
    yield put({
      type: USER.REGISTRATION_STEP1.ERROR,
      payload: result.data
    });
  } else {
    yield put({
      type: USER.REGISTRATION_STEP1.SUCCESS,
      payload: result.data
    });
  }
}

function* watchRegistrationStep1() {
  while (true) {
    const { form } = yield take(USER.REGISTRATION_STEP1.SUBMIT);
    yield fork(registrationStep1, form);
  }
}

export default watchRegistrationStep1;
