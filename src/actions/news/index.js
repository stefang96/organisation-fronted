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
    .catch((err) => {});
};
