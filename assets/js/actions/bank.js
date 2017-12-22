import { action } from "./index";
import { ITEM } from "~Scripts/constants/actions";

export const createItem = (publicToken, account_id) =>
  action(ITEM.CREATE, { publicToken, account_id });
