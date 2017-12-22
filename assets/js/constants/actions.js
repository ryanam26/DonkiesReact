import createRequestType from "~Scripts/utils/createRequestType";

export const USER = createRequestType("USER", [
  { LOGIN: ["ERROR", "SUCCESS", "SUBMIT"] },
  { REGISTRATION_STEP1: ["ERROR", "SUCCESS", "SUBMIT"] },
  { REGISTRATION_STEP2: ["ERROR", "SUCCESS", "SUBMIT"] },
  "LOGOUT",
  "LOGIN_FACEBOOK",
  "REQUEST",
  "ERROR",
  "SUCCESS",
  "REGISTRATION_PARENT",
  { REGISTRATION: ["ERROR", "SUCCESS"] }
]);
export const NAVIGATE = createRequestType("NAVIGATE", ["push"]);
export const FORM_ERRORS = createRequestType("FORM_ERRORS", ["SET"]);
export const API = createRequestType("API", ["FETCH", "REQUEST"]);
export const SETTINGS_LOGIN = createRequestType("SETTINGS_LOGIN", [
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const TOKEN = createRequestType("TOKEN", ["SET", "DELETE"]);
export const ACCOUNTS = createRequestType("ACCOUNTS", [
  "REQUEST",
  "ERROR",
  "SUCCESS",
  "LOADING"
]);
export const SETTINGS = createRequestType("SETTINGS", [
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const ITEM = createRequestType("ITEM", [
  "CREATE",
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
