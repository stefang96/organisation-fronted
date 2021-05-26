import { Map, List, fromJS } from "immutable";
import memberConstants from "../../constants/memberConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  memberList: null,
  member: {},
  memberMeta: null,
  successAction: false,
  errorAction: false,
  contactPersons: null,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case memberConstants.GET_MEMBERS:
      return {
        ...state,
        memberList: action.data.result,
        memberMeta: action.data.meta,
      };
    case memberConstants.GET_MEMBER:
      return {
        ...state,
        member: action.data,
      };
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

    case memberConstants.REMOVE_MEMBER:
      return {
        ...state,
        member: null,
        successAction: true,
        errorAction: false,
        message: "Success remove member.",
      };

    case memberConstants.FAILED_RESPONSE:
      return {
        ...state,
        member: null,
        successAction: false,
        errorAction: true,
        message: action.message,
      };

    case memberConstants.CREATE_MEMBER:
      return {
        ...state,
        successAction: true,
        errorAction: false,
        message: "Success create member.",
      };

    case memberConstants.UPDATE_MEMBER:
      return {
        ...state,
        member: action.data,
        successAction: true,
        errorAction: false,
        message: "Success update member.",
      };

    case memberConstants.GET_CONTACT_PERSONS:
      return {
        ...state,
        contactPersons: action.data,
      };
    default:
      return state;
  }
};
