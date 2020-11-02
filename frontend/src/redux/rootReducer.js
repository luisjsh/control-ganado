import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import itemReducer from "./item/itemReducer";
import notificationReducer from './notification/notificationReducer'

export default combineReducers({
  user: userReducer,
  item: itemReducer,
  notification: notificationReducer
});
