import { action } from "./index";
import { ITEMS } from "~Scripts/constants/actions";

export const createItem = (publicToken, account_id) =>
  action(ITEMS.CREATE, { publicToken, account_id });
export const deleteItem = guid => action(ITEMS.DELETE.SUBMIT, { guid });
