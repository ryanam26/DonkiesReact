import { take, put, call, fork } from "redux-saga/effects";
import { ITEMS } from "~Scripts/constants/actions";
import { ITEMS_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Delete Item

function* deleteItem(guid) {
  const url = `${ITEMS_URL}/${guid}`;

  const result = yield call(apiCall, url, "DELETE", {}, true);

  if (result.isError) {
    yield put({ type: ITEMS.DELETE.ERROR, payload: result.data });
    return;
  }

  yield put({ type: ITEMS.DELETE.SUCCESS });

  // Update Redux state
  yield apiGet("items", {}, ITEMS_URL);
  yield apiGet("accounts", {}, ACCOUNTS_URL);
}

export default function* watchDeleteItem() {
  while (true) {
    const { guid } = yield take(ITEMS.DELETE.SUBMIT);
    yield fork(deleteItem, guid);
  }
}
