import { take, put, call, fork } from "redux-saga/effects";
import { LENDERS, USER_LENDERS } from "~Scripts/constants/actions";
import { USER_LENDERS_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Delete user lender

function* deleteUserLender(pk) {
  const url = `${USER_LENDERS_URL}/${pk}`;

  const result = yield call(apiCall, url, "DELETE", {}, true);

  if (result.isError) {
    yield put({ type: USER_LENDERS.ERROR, payload: result.data });
    return;
  }

  yield put({ type: USER_LENDERS.SUCCESS, payload: result.data });
}

export default function* watchDeleteUserLender() {
  while (true) {
    const { pk } = yield take(LENDERS.USER.DELETE);
    yield fork(deleteUserLender, pk);
  }
}
