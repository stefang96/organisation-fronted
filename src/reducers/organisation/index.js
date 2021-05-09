import organisationConstants from "../../constants/organisationConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  organisationList: null,
  organisationMeta: null,
  organisation: {},
  organisationAdmins: null,
  successAction: false,
  errorAction: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case organisationConstants.GET_ADMINS:
      return {
        ...state,
        organisationAdmins: action.data,
      };
    case organisationConstants.GET_ORGANISATIONS:
      return {
        ...state,
        organisationList: action.data.result,
        organisationMeta: action.data.meta,
      };

    case organisationConstants.GET_ORGANISATION:
      return {
        ...state,
        organisation: action.data,
      };
    case organisationConstants.SUCCESS_ACTION:
      return {
        ...state,
        successAction: true,
        errorAction: false,
        message: action.message,
      };

    case organisationConstants.ERROR_ACTION:
      return {
        ...state,
        successAction: false,
        errorAction: true,
        message: action.message,
      };

    case organisationConstants.CLEAR_ACTION:
      return {
        ...state,
        successAction: false,
        errorAction: false,
        message: "",
      };

    case organisationConstants.REMOVE_MEMBER:
      return {
        ...state,
        organisation: null,
        successAction: true,
        errorAction: false,
        message: "Success remove organisation.",
      };

    case organisationConstants.FAILED_RESPONSE:
      return {
        ...state,
        member: null,
        successAction: false,
        errorAction: true,
        message: action.message,
      };

    case organisationConstants.CREATE_ORGANISATION:
      return {
        ...state,
        successAction: true,
        errorAction: false,
        message: "Success create organisation.",
      };

    case organisationConstants.UPDATE_ORGANISATION:
      return {
        ...state,
        organisation: action.data,
        successAction: true,
        errorAction: false,
        message: "Success update organisation.",
      };

    case organisationConstants.REMOVE_ORGANISATION:
      return {
        ...state,
        organisation: null,
        successAction: true,
        errorAction: false,
        message: "Success remove organisation.",
      };

    default:
      return state;
  }
};
