import api from "../../api/index";
import paymentsConstants from "../../constants/paymentsConstants";
import authConstants from "../../constants/authConstants";
import getToken from "../../utils/getToken";

export const getPayments = (data) => async (dispatch) => {
  return await api
    .put("/payments/all", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
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

export const getLatestPayment = () => async (dispatch) => {
  return await api
    .get("/payments/payment/latest", {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const result = res.data.result;
      dispatch({
        type: paymentsConstants.GET_PAYMENT,
        data: result,
      });
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
      const result = res.data.result;

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        result,
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
