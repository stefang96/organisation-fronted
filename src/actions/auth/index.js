import authConstants from "../../constants/authConstants";
import api from "../../api/index";
import history from "../../history";
import { SubmissionError } from "redux-form";

export const setPassword = (data, email, setpasswordtoken) => async (
  dispatch,
  geState
) => {
  return await api
    .post("/auth/set-password", {
      params: {
        email: email,
        setpasswordtoken: setpasswordtoken,
      },
      data,
    })
    .then((res) => {
      if (res.data.status) {
        history.push("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (data) => async (dispatch) => {
  return await api
    .post("/auth/login", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      const result = res.data.result;
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        result,
      });
      history.push("/");
    })
    .catch((err) => {
      throw new SubmissionError({
        email: err.response.data.message,
        password: err.response.data.message,
      });
    });
};

export const register = (data) => async (dispatch) => {
  console.log(data);
  return await api
    .post("/auth/signup", data)
    .then((res) => {
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
      });
    })
    .catch((err) => {
      throw new SubmissionError({
        email: err.response.data.message,
      });
    });
};
