import api from "../../api/index";
import newsConstants from "../../constants/newsConstants";
import getToken from "../../utils/getToken";

export const getNews = (data) => async (dispatch) => {
  let headers = {};
  if (getToken()) {
    headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    };
  }
  return await api
    .put("/news/all", data, {
      headers: headers,
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: newsConstants.GET_NEWS,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getNewsById = (newsId) => async (dispatch) => {
  let headers = {};
  if (getToken()) {
    headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    };
  }
  return await api
    .get("/news/" + newsId)
    .then((res) => {
      const result = res.data;

      dispatch({
        type: newsConstants.GET_NEWS_BY_ID,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateNews = (newsId) => async (dispatch) => {
  let headers = {};
  if (getToken()) {
    headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    };
  }
  return await api
    .put("/news/" + newsId, {
      headers: headers,
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: newsConstants.UPDATE_NEWS,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when update news!"));
    });
};

export const removeNews = (newsId) => async (dispatch) => {
  let headers = {};
  if (getToken()) {
    headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    };
  }
  return await api
    .delete("/news/" + newsId, {
      headers: headers,
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: newsConstants.REMOVE_NEWS,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when remove news!"));
    });
};

export const createNews = (data) => async (dispatch) => {
  let headers = {};
  if (getToken()) {
    headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    };
  }
  return await api
    .post("/news", data, {
      headers: headers,
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: newsConstants.CREATE_NEWS,
        data: result,
      });

      dispatch(getNews());

      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when creating news!"));
    });
};

const failedResponse = (message) => {
  return {
    type: newsConstants.FAILED_RESPONSE,
    message: message,
  };
};
