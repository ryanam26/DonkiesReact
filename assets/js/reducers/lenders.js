import { LENDERS, USER_LENDERS } from "~Scripts/constants/actions";
import { DEBIT, DEBT } from "~Scripts/constants/common";

const iState = {
  items: null,
  user_lenders: null,
  addLenderInProgress: false,
  deleteLenderInProgress: false,
  triggerLenderCreated: 0,
  triggerLenderDeleted: 0
};

export default function lenders(state = iState, action) {
  switch (action.type) {
    case LENDERS.SUCCESS:
      return {
        ...state,
        items: action.payload
      };

    case USER_LENDERS.SUCCESS:
      return {
        ...state,
        user_lenders: action.payload,
        deleteLenderInProgress: false
      };

    case USER_LENDERS.ERROR:
      return {
        ...state,
        deleteLenderInProgress: false
      };

    case LENDERS.CREATE.SUBMIT:
      return {
        ...state,
        addLenderInProgress: true
      };

    case LENDERS.CREATE.ERROR:
      return {
        ...state,
        addLenderInProgress: false
      };

    case LENDERS.CREATE.SUCCESS:
      return {
        ...state,
        addLenderInProgress: false,
        triggerLenderCreated: state.triggerLenderCreated + 1
      };

    case LENDERS.DELETE.REQUEST:
      return {
        ...state,
        deleteLenderInProgress: true
      };

    case LENDERS.DELETE.SUCCESS:
      return {
        ...state,
        deleteLenderInProgress: false,
        triggerLenderDeleted: state.triggerLenderDeleted + 1
      };

    default:
      return state;
  }
}
