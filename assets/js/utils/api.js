import "whatwg-fetch";

export function* apiCall(url, method, data, isAuth = false) {
  let result = { isError: false };
  let token = window.localStorage.getItem("token");
  let promise = null;

  if (isAuth && token === null) {
    result.isError = true;
    result.data = { non_field_errors: ["The token is not provided."] };
    return result;
  }

  try {
    let fetchObj = { method: method };

    if (method === "POST" || method === "PUT" || method === "PATCH") {
      fetchObj.body = JSON.stringify(data);
    }

    fetchObj.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (isAuth) {
      fetchObj.headers.Authorization = "Token " + token;
    }

    yield (promise = fetch(url, fetchObj));
  } catch (e) {
    result.isError = true;
    result.data = { non_field_errors: ["Connection error."] };
    return result;
  }

  const status = yield promise.then(resp => resp.status).then(data);
  const text = yield promise.then(resp => resp.text()).then(data);

  if (status === 404) {
    result.isError = true;
    result.data = { non_field_errors: ["Resource not found."] };
    return result;
  }

  if (status === 500) {
    result.isError = true;
    result.data = { non_field_errors: ["Internal server error."] };
    return result;
  }

  // Process success case, where no content
  if (status >= 200 && status <= 300 && text.length === 0) {
    result.data = {};
    return result;
  }

  // All other success cases should get valid json object
  // otherwise it is error.
  let obj;
  try {
    obj = JSON.parse(text);
  } catch (e) {
    result.isError = true;
    result.data = { non_field_errors: [text] };
    return result;
  }

  if (status >= 200 && status <= 300) {
    result.data = obj;
    return result;
  }

  result.isError = true;

  // When token wrong - remove it from localstorage.
  if (obj.hasOwnProperty("error_code")) {
    if (obj.error_code === "Bad Token") {
      window.localStorage.removeItem("token");
      result.data = { non_field_errors: ["Bad Token"] };
      return result;
    }
  }

  // DRF in many error cases returns {detail: string}
  if (obj.hasOwnProperty("detail")) {
    result.data = { non_field_errors: [obj.detail] };
    return result;
  }

  // In all other cases it should be valid json object with errors.
  result.data = obj;
  return result;
}
