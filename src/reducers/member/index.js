import { Map, List, fromJS } from "immutable";
import memberConstants from "../../constants/memberConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  memberList: null,
  memberMeta: null,
  successAction: false,
  errorAction: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case memberConstants.SUCCESS_ACTION:
      return {
        ...state,
        successAction: true,
        errorAction: false,
        message: action.message,
      };

    case memberConstants.ERROR_ACTION:
      return {
        ...state,
        successAction: false,
        errorAction: true,
        message: action.message,
      };

    case memberConstants.CLEAR_ACTION:
      return {
        ...state,
        successAction: false,
        errorAction: false,
        message: "",
      };

    default:
      return state;
  }
};
