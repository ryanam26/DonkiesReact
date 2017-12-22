import { NAVIGATE, API, FORM_ERRORS } from "~Scripts/constants/actions";

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const navigate = pathname => action(NAVIGATE.PUSH, { pathname });
export const apiGetRequest = (name, params, url = null) =>
  action(API.FETCH, { name, params, url });
export const setFormErrors = (formType, errors) =>
  action(FORM_ERRORS.SET, { formType, errors });
