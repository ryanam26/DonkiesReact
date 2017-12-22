/*
    This reducer processes all form errors.
    Action can arrive from front-end:
    Example: type: FORM_ERRORS, action: {formType: 'login', errors: errors}

    Action can arrive from back-end (via saga)
    Example: type: LOGIN_ERROR, action: payload (payload contains errors)

    The errors object is always has same properties:
    field1: [errors]
    field2: [errors]
    non_field_errors: [errors]
*/

import { USER, FORM_ERRORS, ITEM } from "~Scripts/constants/actions";

const iState = {
  login: null
};

export default function formErrors(state = iState, action) {
  switch (action.type) {
    case FORM_ERRORS.SET:
      if (action.formType === "clear") {
        return iState;
      } else {
        return {
          ...iState,
          [action.formType]: action.errors
        };
      }

    case ITEM.ERROR:
      return {
        ...state,
        item: action.payload.message
      };

    case USER.LOGIN.ERROR:
      return {
        ...iState,
        login: action.payload
      };

    case USER.REGISTRATION.ERROR:
      return {
        ...iState,
        registration: action.payload
      };

    case USER.REGISTRATION_STEP1.ERROR:
      return {
        ...iState,
        registrationStep1: action.payload
      };

    case USER.REGISTRATION_STEP2.ERROR:
      return {
        ...iState,
        registrationStep2: action.payload
      };

    case USER.REGISTRATION_PARENT.ERROR:
      return {
        ...iState,
        registration: action.payload
      };

    default:
      return state;
  }
}
