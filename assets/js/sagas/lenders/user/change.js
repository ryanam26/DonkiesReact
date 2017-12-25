import { take, put, call, fork } from "redux-saga/effects";
import { LENDERS, USER_LENDERS } from "~Scripts/constants/actions";
import { USER_LENDERS_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Change user lender

function* changeUserLender(pk, account_number) {
  const url = `${USER_LENDERS_URL}`;

  const result = yield call(
    apiCall,
    url,
    "PATCH",
    { pk, account_number },
    true
  );

  if (result.isError) {
    yield put({ type: USER_LENDERS.ERROR, payload: result.data });
    return;
  }

  yield put({ type: USER_LENDERS.SUCCESS, payload: result.data });
}

export default function* watchChangeUserLender() {
  while (true) {
    const { pk, account_number } = yield take(LENDERS.USER.CHANGE);
    yield fork(changeUserLender, pk, account_number);
  }
}
