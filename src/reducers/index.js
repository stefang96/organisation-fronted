import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth/index";
import newsReducer from "./news/index";

/**
 * Main reducer used for combine all others
 */

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  news: newsReducer,
});
