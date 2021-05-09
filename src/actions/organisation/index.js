import api from "../../api/index";
import organisationConstants from "../../constants/organisationConstants";
import { SubmissionError } from "redux-form";
import getToken from "../../utils/getToken";

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

export const sendEmailToContactPerson = (data, memberId) => async (
  dispatch
) => {
  return await api
    .put("/member/send-email/contact-person/" + memberId, data)
    .then((res) => {
      const result = res.data;

      console.log(result);
      dispatch({
        type: organisationConstants.SUCCESS_ACTION,
        message: "Success send email to contact person",
      });
    })
    .catch((err) => {
      console.log(err);
      throw new SubmissionError({
        email: err.response.data.message,
      });
    });
};

export const removeOrganisation = (organisationId) => async (dispatch) => {
  return await api
    .delete("/organisation/" + organisationId, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: organisationConstants.REMOVE_ORGANISATION,
        data: result,
      });

      const getOrganisationData = {
        pagination: { page: 1 },
      };
      dispatch(getOrganisations(getOrganisationData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      //dispatch(failedResponse("Error when remove member!"));
    });
};

export const getOrganisationById = (organisationId) => async (dispatch) => {
  return await api
    .get("/organisation/" + organisationId, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data.result;

      dispatch({
        type: organisationConstants.GET_ORGANISATION,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrganisationAdmins = (organisationId) => async (dispatch) => {
  return await api
    .get("/organisation/get-admins/" + organisationId, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data.result;

      dispatch({
        type: organisationConstants.GET_ADMINS,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addOrganisation = (data) => async (dispatch) => {
  return await api
    .post("/organisation", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: organisationConstants.CREATE_ORGANISATION,
        data: result,
      });

      const getMembersData = {
        pagination: { page: 1 },
      };
      dispatch(getOrganisations(getMembersData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      //  dispatch(failedResponse("Error when creating member!"));
    });
};

export const updateOrganisation = (organisationId, data) => async (
  dispatch
) => {
  return await api
    .put("/organisation/" + organisationId, data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: organisationConstants.UPDATE_ORGANISATION,
        data: result,
      });

      const getMembersData = {
        pagination: { page: 1 },
      };
      dispatch(getOrganisations(getMembersData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      //  dispatch(failedResponse("Error when creating member!"));
    });
};
