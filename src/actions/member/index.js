import api from "../../api/index";
import memberConstants from "../../constants/memberConstants";
import getToken from "../../utils/getToken";

export const getMemberById = (memberId) => async (dispatch) => {
  return await api
    .get("/member/" + memberId, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data.result;

      dispatch({
        type: memberConstants.GET_MEMBER,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllContactPersons = () => async (dispatch) => {
  return await api
    .get("/member/contact-persons/get-all")
    .then((res) => {
      const result = res.data.result;

      dispatch({
        type: memberConstants.GET_CONTACT_PERSONS,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMembers = (data) => async (dispatch) => {
  return await api
    .put("/member/get-all", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: memberConstants.GET_MEMBERS,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateMember = (data, memberId) => async (dispatch) => {
  return await api
    .put("/member/" + memberId, data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data.result;

      dispatch({
        type: memberConstants.UPDATE_MEMBER,
        data: result,
      });

      const getMembersData = {
        pagination: { page: 1 },
      };
      dispatch(getMembers(getMembersData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when update member!"));
    });
};

export const deleteMember = (memberId) => async (dispatch) => {
  return await api
    .delete("/member/" + memberId, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: memberConstants.REMOVE_MEMBER,
        data: result,
      });

      const getMembersData = {
        pagination: { page: 1 },
      };
      dispatch(getMembers(getMembersData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when remove member!"));
    });
};

export const addMember = (data) => async (dispatch) => {
  return await api
    .post("/member", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: memberConstants.CREATE_MEMBER,
        data: result,
      });

      const getMembersData = {
        pagination: { page: 1 },
      };
      dispatch(getMembers(getMembersData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedResponse("Error when creating member!"));
    });
};

export const clearMemerAction = () => async (dispatch) => {
  dispatch({
    type: memberConstants.CLEAR_ACTION,
  });
};

const failedResponse = (message) => {
  return {
    type: memberConstants.FAILED_RESPONSE,
    message: message,
  };
};
