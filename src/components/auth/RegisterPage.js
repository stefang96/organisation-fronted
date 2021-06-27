import React from "react";
import { reduxForm, Field } from "redux-form";
import Container from "./Container";
import renderTextField from "../fields/renderTextField ";
import { Link } from "react-router-dom";
import validate from "../fields/validation/validateSignUp";
import "./login.scss";
import { register, disableAuthMessage } from "../../actions/index";
import { connect } from "react-redux";
import history from "../../history";

const RegisterPage = (props) => {
  const onSubmit = (formValues) => {
    return props.register(formValues);
  };
  const disableAuthMessage = () => {
    props.disableAuthMessage();
    history.push("/sign-in");
  };
  return (
    <Container>
      <>
        <h3 className="public-title">Create organisation</h3>
        {props.signUp && props.signUp === true ? (
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
              className="form"
              onSubmit={props.handleSubmit(onSubmit)}
              noValidate
            >
              <Field
                name="name"
                component={renderTextField}
                label="Name"
                type="text"
              />
              <Field
                name="address"
                component={renderTextField}
                label="Address"
                type="text"
              />
              <div className="flex-wrap d-flex justify-content-between w-100">
                <Field
                  name="price"
                  component={renderTextField}
                  label="Pice"
                  type="number"
                />
                <Field
                  name="numberOfEmployees"
                  component={renderTextField}
                  label="Number of Employees"
                  type="text"
                />
              </div>
              <div>
                <div className="color-blue d-flex flex-row justify-content-start mt-10">
                  <span>Add contact person</span>
                </div>
                <div className="h-divider mb-15 mt-10"></div>
                <div className="flex-wrap d-flex justify-content-between w-100">
                  <Field
                    name="firstName"
                    component={renderTextField}
                    label="First Name"
                  />
                  <Field
                    name="lastName"
                    component={renderTextField}
                    label="Last Name"
                  />
                </div>
                <Field
                  name="email"
                  component={renderTextField}
                  label="Email"
                  type={"email"}
                  info={true}
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary br-30  mt-30" type="submit">
                  {" "}
                  Create organisation
                </button>
              </div>
            </form>
            <div className="login__links">
              <div>
                <Link to="/sign-in" className="login__links-right">
                  You already have an account please Sign In
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
    signUp: state.auth.signUp,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps, { register, disableAuthMessage })(
  reduxForm({
    form: "signUpForm",
    validate,
  })(RegisterPage)
);
