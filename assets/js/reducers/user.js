import { USER } from "~Scripts/constants/actions";

const iState = {
  isAuthenticated: false
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
    case USER.LOGOUT:
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
