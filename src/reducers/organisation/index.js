import organisationConstants from "../../constants/organisationConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  organisationList: null,
  organisationMeta: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case organisationConstants.GET_ORGANISATIONS:
      return {
        ...state,
        organisationList: action.data.result,
        organisationMeta: action.data.meta,
      };

    default:
      return state;
  }
};
