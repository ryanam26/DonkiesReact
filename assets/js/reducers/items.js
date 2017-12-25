import { ITEMS } from "~Scripts/constants/actions";

const iState = {
  items: []
};

export default function items(state = iState, action) {
  switch (action.type) {
    case ITEMS.SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case ITEMS.DELETE.SUBMIT:
      return {
        ...state,
        deleteItemInProgress: true
      };
    case ITEMS.DELETE.ERROR:
    case ITEMS.DELETE.SUCCESS:
      return {
        ...state,
        deleteItemInProgress: false
      };

    default:
      return state;
  }
}
