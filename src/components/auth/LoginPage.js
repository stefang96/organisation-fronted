import React from "react";
import { reduxForm, Field } from "redux-form";
import Container from "./Container";
import renderPasswordField from "../fields/renderPasswordField";
import renderTextField from "../fields/renderTextField ";
import { Link } from "react-router-dom";
import validate from "../fields/validation/validateLogin";
import "./login.scss";
import { login } from "../../actions/index";
import { connect } from "react-redux";

const LoginPage = (props) => {
  const onSubmit = (formValues) => {
    return props.login(formValues);
  };

  return (
    <Container>
      <>
        <h3 className="public-title">Welcome back!</h3>
        <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
          <Field
            name="email"
            type="email"
            info={true}
            component={renderTextField}
            label="Email"
          />
          <Field
            name="password"
            type="password"
            component={renderPasswordField}
            label="Password"
          />

          <div className="d-grid gap-2">
            <button className="btn btn-primary br-30 mt-10" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="login__links">
          <div>
            <Link to="/reset-password" className="">
              Forgot your password?
            </Link>
          </div>
          <div>
            <Link to="/sign-up">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </>
    </Container>
  );
};

export default connect(null, { login })(
  reduxForm({
    form: "loginForm", // a unique identifier for this form
    validate,
  })(LoginPage)
);
