import api from "../../api/index";
import memberConstants from "../../constants/memberConstants";
import { SubmissionError } from "redux-form";
import getToken from "../../utils/getToken";

export const sendEmailToContactPerson = (data, memberId) => async (
  dispatch
) => {
  return await api
    .put("/member/send-email/contact-person/" + memberId, data)
    .then((res) => {
      const result = res.data;

      console.log(result);
      dispatch({
        type: memberConstants.SUCCESS_ACTION,
        message: "Success send email to contact person",
      });
    })
    .catch((err) => {
      console.log(err);
      throw new SubmissionError({
        email: err.response.data.message,
      });
      //   dispatch({
      //   type: memberConstants.ERROR_ACTION,
      //  });
    });
};

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

      //   dispatch({
      //   type: memberConstants.ERROR_ACTION,
      //  });
    });
};

export const clearMemerAction = () => async (dispatch) => {
  dispatch({
    type: memberConstants.CLEAR_ACTION,
  });
};
