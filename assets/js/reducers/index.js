import { combineReducers } from "redux";

import UserReducers from "~Scripts/reducers/user";

export default combineReducers({ user: UserReducers });
