import { SETTINGS } from "~Scripts/constants/actions";

const iState = {};

export default function settings(state = iState, action) {
  switch (action.type) {
    case SETTINGS.SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
