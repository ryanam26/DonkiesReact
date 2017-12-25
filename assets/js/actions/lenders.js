import { action } from "./index";
import { LENDERS } from "~Scripts/constants/actions";

export const addLender = form => action(LENDERS.CREATE.SUBMIT, { form });
export const deleteLender = id => action(LENDERS.DELETE.SUBMIT, { id });

export const changeUserLender = (pk, account_number) =>
  action(LENDERS.USER.CHANGE, { pk, account_number });
export const deleteUserLender = pk => action(LENDERS.USER.DELETE, { pk });
