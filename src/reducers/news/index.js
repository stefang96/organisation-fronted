import { Map, List, fromJS } from "immutable";
import newsConstants from "../../constants/newsConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  newsList: null,
  newsMeta: null,
  news: null,
  message: null,
  successAction: false,
  errorAction: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case newsConstants.GET_NEWS:
      return {
        ...state,
        newsList: action.data.result,
        newsMeta: action.data.meta,
      };
    case newsConstants.CREATE_NEWS:
      return {
        ...state,
        successAction: true,
        errorAction: false,
        message: "Success create news.",
      };

    case newsConstants.GET_NEWS_BY_ID:
      return {
        ...state,
        news: action.data.result,
      };

    case newsConstants.UPDATE_NEWS:
      return {
        ...state,
        news: null,
        successAction: true,
        errorAction: false,
        message: "Success update news.",
      };

    case newsConstants.REMOVE_NEWS:
      return {
        ...state,
        news: null,
        successAction: true,
        errorAction: false,
        message: "Success remove news.",
      };

    case newsConstants.FAILED_RESPONSE:
      return {
        ...state,
        news: null,
        successAction: false,
        errorAction: true,
        message: action.message,
      };

    case newsConstants.CLEAR_ACTIONS:
      return {
        ...state,
        successAction: false,
        errorAction: false,
        message: null,
      };

    default:
      return state;
  }
};
