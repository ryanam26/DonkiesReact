import { USER, TOKEN } from "~Scripts/constants/actions";

const iState = {
  isAuthenticated: false,
  inProgress: false
};

export default function user(state = iState, action = {}) {
  switch (action.type) {
    case USER.LOGIN.SUCCESS:
      window.localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      };
    case USER.REGISTRATION_STEP1.SUCCESS:
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true
      };
    case USER.REGISTRATION_STEP2.SUCCESS:
      return {
        ...state,
        details: action.payload
      };
    case TOKEN.SET:
      window.localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true
      };
    case USER.SUCCESS:
      return {
        ...state,
        details: action.payload
      };
    case USER.CHANGE_PASSWORD.REQUEST:
    case USER.EDIT_PROFILE.REQUEST:
      return {
        ...state,
        inProgress: true
      };
    case USER.CHANGE_PASSWORD.SUCCESS:
    case USER.EDIT_PROFILE.SUCCESS:
      return {
        ...state,
        inProgress: false
      };
    case USER.LOGOUT:
    case TOKEN.DELETE:
      window.localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
