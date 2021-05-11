import { Map, List, fromJS } from "immutable";
import paymentsConstants from "../../constants/paymentsConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  paymentList: null,
  payment: {},
  paymentMeta: null,
  successAction: false,
  errorAction: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case paymentsConstants.GET_PAYMENT:
      return {
        ...state,
        payment: action.data,
      };

    default:
      return state;
  }
};
