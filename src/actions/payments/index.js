import api from "../../api/index";
import paymentsConstants from "../../constants/paymentsConstants";
import { SubmissionError } from "redux-form";
import getToken from "../../utils/getToken";

export const getPayments = (data) => async (dispatch) => {
  return await api
    .put("/payments/all", data)
    .then((res) => {
      const result = res.data;
      dispatch({
        type: paymentsConstants.GET_PAYMENTS,
        data: result,
      });

      console.log(result);
    })
    .catch((err) => {});
};

export const addPayments = (data) => async (dispatch) => {
  return await api
    .post("/payments", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data;

      dispatch({
        type: paymentsConstants.CREATE_PAYMENTS,
        data: result,
      });

      const getPaymentsData = {
        pagination: { page: 1 },
      };
      dispatch(getPayments(getPaymentsData));
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      //  dispatch(failedResponse("Error when creating member!"));
    });
};
