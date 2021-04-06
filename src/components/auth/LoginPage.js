import React from "react";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import Container from "./Container";
import renderPasswordField from "../fields/renderPasswordField";
import renderTextField from "../fields/renderTextField ";
import { Link } from "react-router-dom";
import validate from "../fields/validation/validateLogin";
import "./login.scss";
import { login } from "../../actions/index";
import { connect } from "react-redux";

const LoginPage = (props) => {
  const classes = withStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
              Login
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
            <Link to="/register">Don't have an account? Sign Up</Link>
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
