import { take, put, call, fork, select } from "redux-saga/effects";
import * as actions from "actions";
import {
  ACCOUNTS_URL,
  ACCOUNTS_SET_ACTIVE_URL,
  ACCOUNTS_SET_NUMBER_URL,
  ACCOUNTS_SET_PRIMARY_URL,
  apiCall
} from "services/api";
import { apiGet } from "../web/apiGetRequest";

// ------- Create account (manually create debt account)

function* createAccount(form) {
  yield put({ type: actions.CREATE_ACCOUNT.REQUEST });
  const result = yield call(apiCall, ACCOUNTS_URL, "POST", form, true);

  if (result.isError) {
    yield put({ type: actions.CREATE_ACCOUNT.ERROR, payload: result.data });
    return;
  }

  yield put({ type: actions.CREATE_ACCOUNT.SUCCESS });
  yield apiGet("accounts", {}, ACCOUNTS_URL);
}

export function* watchCreateAccount() {
  while (true) {
    const { form } = yield take(actions.CREATE_ACCOUNT.SUBMIT);
    yield fork(createAccount, form);
  }
}

// ------- Set active

function* setActive(id, form) {
  yield put({ type: actions.ACCOUNTS_SET_ACTIVE.REQUEST });

  const url = `${ACCOUNTS_SET_ACTIVE_URL}/${id}`;

  const result = yield call(apiCall, url, "PUT", form, true);

  if (result.isError) {
    yield put({
      type: actions.ACCOUNTS_SET_ACTIVE.ERROR,
      payload: result.data
    });
    return;
  }

  yield apiGet("accounts", {}, ACCOUNTS_URL);
}

export function* watchSetActive() {
  while (true) {
    const { id, form } = yield take(actions.ACCOUNTS_SET_ACTIVE.SUBMIT);
    yield fork(setActive, id, form);
  }
}

// ------- Set account number

function* setAccountNumber(id, form) {
  yield put({ type: actions.ACCOUNTS_SET_NUMBER.REQUEST });

  const url = `${ACCOUNTS_SET_NUMBER_URL}/${id}`;
  const result = yield call(apiCall, url, "POST", form, true);

  if (result.isError) {
    yield put({
      type: actions.ACCOUNTS_SET_NUMBER.ERROR,
      payload: result.data
    });
    return;
  }

  yield apiGet("accounts", {}, ACCOUNTS_URL);
  yield put({ type: actions.ACCOUNTS_SET_NUMBER.SUCCESS });
}

export function* watchSetAccountNumber() {
  while (true) {
    const { id, form } = yield take(actions.ACCOUNTS_SET_NUMBER.SUBMIT);
    yield fork(setAccountNumber, id, form);
  }
}

// ------- Set primary account

function* setPrimaryAccount(id) {
  yield put({ type: actions.ACCOUNTS_SET_PRIMARY.REQUEST });

  const url = `${ACCOUNTS_SET_PRIMARY_URL}/${id}`;
  const result = yield call(apiCall, url, "POST", {}, true);

  if (result.isError) {
    yield put({
      type: actions.ACCOUNTS_SET_PRIMARY.ERROR,
      payload: result.data
    });
    return;
  }

  yield apiGet("accounts", {}, ACCOUNTS_URL);
  yield put({ type: actions.ACCOUNTS_SET_PRIMARY.SUCCESS });
}

export function* watchSetPrimaryAccount() {
  while (true) {
    const { id } = yield take(actions.ACCOUNTS_SET_PRIMARY.SUBMIT);
    yield fork(setPrimaryAccount, id);
  }
}
