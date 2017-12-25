import { DEBT_INSTITUTIONS } from "~Scripts/constants/actions";
import { DEBIT, DEBT } from "~Scripts/constants/common";

const iState = {
  debtInstitutions: null
};

export default function institutions(state = iState, action) {
  switch (action.type) {
    case DEBT_INSTITUTIONS.SUCCESS:
      return {
        ...state,
        debtInstitutions: action.payload
      };

    default:
      return state;
  }
}
