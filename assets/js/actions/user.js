import { action } from "./index";
import { USER } from "~Scripts/constants/actions";

export const login = (email, password) =>
  action(USER.LOGIN.SUBMIT, { email, password });
export const loginFacebook = code => action(USER.LOGIN_FACEBOOK, { code });
export const logout = () => action(USER.LOGOUT);
export const registrationStep1 = form =>
  action(USER.REGISTRATION_STEP1.SUBMIT, { form });
export const registrationStep2 = form =>
  action(USER.REGISTRATION_STEP2.SUBMIT, { form });
export const registrationParent = form =>
  action(USER.REGISTRATION_PARENT, { form });
