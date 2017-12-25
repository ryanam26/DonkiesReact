import { take, put, call, fork } from "redux-saga/effects";
import { ITEMS, ACCOUNTS } from "~Scripts/constants/actions";
import { ITEMS_URL, ACCOUNTS_URL, USER_URL } from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";
import { apiGet } from "~Scripts/sagas/common/api";

// ------- Create Item

function* createItem(publicToken, account_id) {
  yield put({ type: ACCOUNTS.LOADING });
  const form = { public_token: publicToken, account_id };
  const result = yield call(apiCall, ITEMS_URL, "POST", form, true);

  if (result.isError) {
    yield put({ type: ITEMS.ERROR, payload: result.data });
    return;
  }

  yield put({ type: ITEMS.SUCCESS, payload: result.data });

  // Update items, accounts and user in Redux state.
  // User need to be updated for signup_steps
  yield apiGet("items", {}, ITEMS_URL);
  yield apiGet("accounts", {}, ACCOUNTS_URL);
  yield apiGet("user", {}, USER_URL);

  // When user created new Item, transaction are not ready instantly.
  // Wait for transactions (10 attempts every 30 seconds).
}

function* watchCreateItem() {
  while (true) {
    const { publicToken, account_id } = yield take(ITEMS.CREATE);
    yield fork(createItem, publicToken, account_id);
  }
}

export default watchCreateItem;
