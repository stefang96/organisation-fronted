import api from "../../api/index";
import newsConstants from "../../constants/newsConstants";

export const getNews = (data) => async (dispatch) => {
  return await api
    .put("/news/all", data)
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
