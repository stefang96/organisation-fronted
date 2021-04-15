import api from "../../api/index";
import memberConstants from "../../constants/memberConstants";
import { SubmissionError } from "redux-form";

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

export const clearMemerAction = () => async (dispatch) => {
  dispatch({
    type: memberConstants.CLEAR_ACTION,
  });
};
