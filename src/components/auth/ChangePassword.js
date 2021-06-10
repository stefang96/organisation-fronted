import React, { useState } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import validate from "../fields/validation/validateSetPassword";
import { connect } from "react-redux";
import { changePassword } from "../../actions/index";
import renderPasswordField from "../fields/renderPasswordField";

const ChangePassword = (props) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
    // props.changePassword(props.newsId, props.memberId, props.profile);
    //   props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <Field
            name="password"
            component={renderPasswordField}
            label="Password"
          />
          <Field
            name="rePassword"
            component={renderPasswordField}
            label="Confirm Password"
          />
        </Modal.Body>

        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              className="btn  btn-outline-danger w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button className="btn  btn-outline-primary  w-150 " type="submit">
              Save
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { changePassword })(
  reduxForm({
    form: "changePasswordForm", // a unique identifier for this form

    validate,
    enableReinitialize: true,
    touchOnBlur: false,
  })(ChangePassword)
);
