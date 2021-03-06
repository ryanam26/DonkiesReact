import createRequestType from "~Scripts/utils/createRequestType";

export const USER = createRequestType("USER", [
  { LOGIN: ["ERROR", "SUCCESS", "SUBMIT"] },
  { CHANGE_PASSWORD: ["ERROR", "SUCCESS", "SUBMIT", "REQUEST", "CONFIRM"] },
  { EDIT_PROFILE: ["ERROR", "SUCCESS", "SUBMIT", "REQUEST"] },
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
export const TRANSACTIONS = createRequestType("TRANSACTIONS", [
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const DEBT_INSTITUTIONS = createRequestType("DEBT_INSTITUTIONS", [
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const USER_LENDERS = createRequestType("USER_LENDERS", [
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const STAT = createRequestType("STAT", ["REQUEST", "ERROR", "SUCCESS"]);
export const ITEMS = createRequestType("ITEMS", [
  "CREATE",
  { DELETE: ["SUBMIT", "ERROR", "SUCCESS"] },
  "REQUEST",
  "ERROR",
  "SUCCESS"
]);
export const LENDERS = createRequestType("LENDERS", [
  "REQUEST",
  "ERROR",
  "SUCCESS",
  { CREATE: ["SUBMIT", "SUCCESS", "ERROR"] },
  { DELETE: ["SUBMIT", "SUCCESS", "ERROR"] },
  {
    USER: [
      "SUBMIT",
      "SUCCESS",
      "ERROR",
      "REQUEST",
      "CREATE",
      "DELETE",
      "CHANGE"
    ]
  }
]);
