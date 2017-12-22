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

    default:
      return state;
  }
}
