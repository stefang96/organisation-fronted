import { Map, List, fromJS } from "immutable";
import newsConstants from "../../constants/newsConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  newsList: null,
  newsMeta: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case newsConstants.GET_NEWS:
      return {
        ...state,
        newsList: action.data.result,
        newsMeta: action.data.meta,
      };

    default:
      return state;
  }
};
