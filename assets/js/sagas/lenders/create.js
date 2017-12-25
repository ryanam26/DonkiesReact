import { take, put, call, fork } from "redux-saga/effects";
import { LENDERS } from "~Scripts/constants/actions";
import { LENDERS_URL, USER_LENDERS_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Add lender

function* addLender(form) {
  const result = yield call(apiCall, LENDERS_URL, "POST", form, true);

  if (result.isError) {
    yield put({ type: LENDERS.CREATE.ERROR, payload: result.data });
    return;
  }

  yield put({ type: LENDERS.CREATE.SUCCESS });
  yield apiGet("lenders", {}, LENDERS_URL);
  yield apiGet("user_lenders", {}, USER_LENDERS_URL);
}

export default function* watchAddLender() {
  while (true) {
    const { form } = yield take(LENDERS.CREATE.SUBMIT);
    yield fork(addLender, form);
  }
}
