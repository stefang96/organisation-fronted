import { Map, List, fromJS } from "immutable";
import authConstants from "../../constants/authConstants";
import jwt from "jsonwebtoken";

/**
 * Login and registration reducer redux
 */

const initialState = {
  loggedIn: null,
  user: null,
  resetPasswordEmail: "",
  redirectToPath: null,
  signUp: false,
  resetPassword: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.result.token);
      const user = jwt.decode(action.result.token);

      return {
        ...state,
        user: user,
        loggedIn: true,
      };
    case authConstants.SIGNUP_MESSAGE:
      return {
        ...state,
        signUp: true,
        message: action.data,
      };

    case authConstants.RESET_PASSWORD_MESSAGE:
      return {
        ...state,
        resetPassword: true,
        message: action.data,
      };

    case authConstants.DISABLED_MESSAGE:
      return {
        ...state,
        resetPassword: false,
        signUp: false,
        message: "",
      };

    case authConstants.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};
