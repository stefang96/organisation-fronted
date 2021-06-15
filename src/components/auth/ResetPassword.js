import React from "react";
import Container from "./Container";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../fields/renderTextField ";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword, disableAuthMessage } from "../../actions/index";
import history from "../../history";

const validate = (formValues) => {
  const errors = {};
  const emailRegex =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!formValues.email.match(emailRegex)) {
    errors.email = "Invalid email";
  }

  return errors;
};

const ResetPassword = (props) => {
  const onSubmit = (formValues) => {
    return props.resetPassword(formValues);
  };

  const disableAuthMessage = () => {
    props.disableAuthMessage();
    history.push("/sign-in");
  };

  return (
    <Container>
      <>
        <h3 className="public-title">Password reset</h3>

        {props.resetPasswordStatus && props.resetPasswordStatus === true ? (
          <div>
            <p className="text-center pt-10">
              {props.message && props.message}
            </p>

            <div className="text-center ">
              <button
                onClick={() => disableAuthMessage()}
                className="btn btn-primary w-200 br-30 mt-10"
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          <>
            <form
              className="mt-10"
              onSubmit={props.handleSubmit(onSubmit)}
              noValidate
            >
              <Field
                name="email"
                type="email"
                info={true}
                component={renderTextField}
                label="Email"
              />

              <div className="d-grid gap-2">
                <button className="btn btn-primary br-30 mt-10" type="submit">
                  Password reset
                </button>
              </div>
            </form>

            <div className="login__links">
              <div>
                <Link to="/sign-in" className="">
                  Back
                </Link>
              </div>
            </div>
          </>
        )}
      </>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    resetPasswordStatus: state.auth.resetPassword,
    message: state.auth.message,
  };
};
export default connect(mapStateToProps, { resetPassword, disableAuthMessage })(
  reduxForm({
    form: "resetPasswordForm", // a unique identifier for this form
    validate,
  })(ResetPassword)
);
