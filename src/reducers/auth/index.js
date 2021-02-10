import { Map, List, fromJS } from "immutable";
import authConstants from '../../constants/authConstants'
import jwt from "jsonwebtoken";

/**
 * Login and registration reducer redux
 */

const initialState = Map({
  loggedIn: null,
  user: Map(),
  resetPasswordEmail: "",
  resetPasswordSuccess: false,
  redirectToPath: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
 
    case authConstants.LOGIN_SUCCESS:
        localStorage.setItem('token',action.result.token)
        const user = jwt.decode(action.result.token)
        console.log(action)
        return {
            ...state,
            token:action.result.token,
            user:fromJS(user),
            loggedIn:true
        } ;

    default:
      return state;
  }
};
