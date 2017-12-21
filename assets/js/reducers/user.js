import { USER } from "~Scripts/constants/actions";

const iState = {
  is_authenticated: false
};

export default function user(state = iState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
