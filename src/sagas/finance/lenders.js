import { take, put, call, fork, select } from "redux-saga/effects";
import * as actions from "actions";
import { LENDERS_URL, USER_LENDERS_URL, apiCall } from "services/api";
import { apiGet } from "../web/apiGetRequest";

// ------- Add lender

function* addLender(form) {
  yield put({ type: actions.ADD_LENDER.REQUEST });
  const result = yield call(apiCall, LENDERS_URL, "POST", form, true);

  if (result.isError) {
    yield put({ type: actions.ADD_LENDER.ERROR, payload: result.data });
    return;
  }

  yield put({ type: actions.ADD_LENDER.SUCCESS });
  yield apiGet("lenders", {}, LENDERS_URL);
  yield apiGet("user_lenders", {}, USER_LENDERS_URL);
}

export function* watchAddLender() {
  while (true) {
    const { form } = yield take(actions.ADD_LENDER.SUBMIT);
    yield fork(addLender, form);
  }
}

// ------- Delete Lender

function* deleteLender(id) {
  yield put({ type: actions.DELETE_LENDER.REQUEST });
  const url = `${LENDERS_URL}/${id}`;

  const result = yield call(apiCall, url, "DELETE", {}, true);

  if (result.isError) {
    yield put({ type: actions.DELETE_LENDER.ERROR, payload: result.data });
    return;
  }

  yield put({ type: actions.DELETE_LENDER.SUCCESS });
  yield apiGet("lenders", {}, LENDERS_URL);
}

export function* watchDeleteLender() {
  while (true) {
    const { id } = yield take(actions.DELETE_LENDER.SUBMIT);
    yield fork(deleteLender, id);
  }
}

// ------- Change user lender

function* changeUserLender(pk, account_number) {
  yield put({ type: actions.CHANGE_USER_LENDER.REQUEST });
  const url = `${USER_LENDERS_URL}`;

  const result = yield call(
    apiCall,
    url,
    "PATCH",
    { pk, account_number },
    true
  );

  if (result.isError) {
    yield put({ type: actions.CHANGE_USER_LENDER.ERROR, payload: result.data });
    return;
  }

  yield put({ type: actions.CHANGE_USER_LENDER.SUCCESS, payload: result.data });
}

export function* watchChangeUserLender() {
  while (true) {
    const { pk, account_number } = yield take(
      actions.CHANGE_USER_LENDER.SUBMIT
    );
    yield fork(changeUserLender, pk, account_number);
  }
}

// ------- Delete user lender

function* deleteUserLender(pk) {
  yield put({ type: actions.DELETE_USER_LENDER.REQUEST });
  const url = `${USER_LENDERS_URL}/${pk}`;

  const result = yield call(apiCall, url, "DELETE", {}, true);

  if (result.isError) {
    yield put({ type: actions.DELETE_USER_LENDER.ERROR, payload: result.data });
    return;
  }

  yield put({ type: actions.DELETE_USER_LENDER.SUCCESS, payload: result.data });
}

export function* watchDeleteUserLender() {
  while (true) {
    const { pk } = yield take(actions.DELETE_USER_LENDER.SUBMIT);
    yield fork(deleteUserLender, pk);
  }
}
