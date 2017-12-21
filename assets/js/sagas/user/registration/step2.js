import { take, put, call, fork } from "redux-saga/effects";
import { USER } from "~Scripts/constants/actions";
import { REGISTRATION_STEP2_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

function* registrationStep2(form) {
  const result = yield call(
    apiCall,
    REGISTRATION_STEP2_URL,
    "POST",
    form,
    true
  );
  if (result.isError) {
    yield put({
      type: USER.REGISTRATION_STEP2.ERROR,
      payload: result.data
    });
  } else {
    yield put({ type: USER.REGISTRATION_STEP2.SUCCESS });
  }
}

function* watchRegistrationStep2() {
  while (true) {
    const { form } = yield take(USER.REGISTRATION_STEP2.SUBMIT);
    yield fork(registrationStep2, form);
  }
}

export default watchRegistrationStep2;
