import { combineReducers } from "redux";

import UserReducers from "./user";
import formErrors from "./forms";

export default combineReducers({ user: UserReducers, formErrors });
