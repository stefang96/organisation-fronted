import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth/index";
import newsReducer from "./news/index";
import organisationReducer from "./organisation/index";
import memberReducer from "./member/index";
import paymentReducer from "./payments/index";

/**
 * Main reducer used for combine all others
 */

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  news: newsReducer,
  member: memberReducer,
  payment: paymentReducer,
  organisation: organisationReducer,
});
