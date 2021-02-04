import { combineReducers } from "redux-immutable";
import { reducer } from "redux-form/immutable";
 

/**
 * Main reducer used for combine all others
 */

export default combineReducers({
  form: reducer 
});