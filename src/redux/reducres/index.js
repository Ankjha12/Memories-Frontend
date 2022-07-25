import { combineReducers } from "redux";

import { postReducer as posts } from "./postReducer";
import { AuthReducer } from "./AuthReducer";

export default combineReducers({
  posts,
  AuthReducer,
});
