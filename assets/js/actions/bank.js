import { action } from "./index";
import { ITEMS } from "~Scripts/constants/actions";

export const createItem = (publicToken, account_id) =>
  action(ITEMS.CREATE, { publicToken, account_id });
