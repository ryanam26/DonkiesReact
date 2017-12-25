import { combineReducers } from "redux";

import user from "./user";
import formErrors from "./forms";
import accounts from "./accounts";
import settings from "./settings";
import items from "./items";
import stat from "./stat";
import transactions from "./transactions";
import lenders from "./lenders";
import institutions from "./institutions";

export default combineReducers({
  user,
  formErrors,
  accounts,
  settings,
  items,
  stat,
  transactions,
  lenders,
  institutions
});
