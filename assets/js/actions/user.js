import { action } from "./index";
import { USER, TOKEN } from "~Scripts/constants/actions";

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
export const setToken = token => action(TOKEN.SET, { token });
export const deleteToken = () => action(TOKEN.DELETE);
export const changePassword = form =>
  action(USER.CHANGE_PASSWORD.SUBMIT, { form });
export const editProfile = form => action(USER.EDIT_PROFILE.SUBMIT, { form });
export const resetPasswordRequest = form =>
  action(USER.CHANGE_PASSWORD.REQUEST, { form });
