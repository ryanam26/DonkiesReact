import { TRANSACTIONS } from "~Scripts/constants/actions";

const iState = {
  items: null
};

export default function transactions(state = iState, action) {
  switch (action.type) {
    case TRANSACTIONS.REQUEST:
      return {
        ...state,
        items: null
      };

    case TRANSACTIONS.SUCCESS:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}
