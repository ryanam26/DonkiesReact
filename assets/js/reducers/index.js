import { combineReducers } from "redux";

import user from "./user";
import formErrors from "./forms";
import accounts from "./accounts";
import settings from "./settings";
import items from "./items";
import stat from "./stat";
import transactions from "./transactions";

export default combineReducers({
  user,
  formErrors,
  accounts,
  settings,
  items,
  stat,
  transactions
});
