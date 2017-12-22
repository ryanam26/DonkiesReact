import { take, put, call, fork } from "redux-saga/effects";
import * as actions from "~Scripts/constants/actions";
import * as urls from "~Scripts/constants/urls";
import { apiCall } from "~Scripts/utils/api";

/**
 * Require auth by default.
 */
export function* apiGet(name, params, url) {
  // TODO: add params to url
  const a = actions[name.toUpperCase()];
  const urlKey = `${name.toUpperCase()}_URL`;
  if (!url) {
    url = urls[urlKey];
  }

  let useToken =
    params && params.hasOwnProperty("useToken") && params.useToken === false
      ? false
      : true;

  yield put({ type: a.REQUEST });

  const result = yield call(apiCall, url, "GET", {}, useToken);
  if (result.isError) {
    yield put({ type: a.ERROR, payload: result.data });
  } else {
    yield put({ type: a.SUCCESS, payload: result.data });
  }
}

function* watchApiGetRequest() {
  while (true) {
    const { name, params, url } = yield take(actions.API.FETCH);
    yield fork(apiGet, name, params, url);
  }
}

export default [watchApiGetRequest];
