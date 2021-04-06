import api from "../../api/index";
import organisationConstants from "../../constants/organisationConstants";

export const getOrganisations = (data) => async (dispatch) => {
  return await api
    .put("/organisation/all", data)
    .then((res) => {
      const result = res.data;
      dispatch({
        type: organisationConstants.GET_ORGANISATIONS,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {});
};
