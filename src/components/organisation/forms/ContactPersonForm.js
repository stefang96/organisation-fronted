import React from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import { connect } from "react-redux";
import validate from "../../fields/validation/validateContactPersonForm";
import { sendEmailToContactPerson } from "../../../actions/index";

const ContactPersonForm = (props) => {
  const renderTextArea = ({ input, label, name, classNameField }) => {
    return (
      <div className="form-floating">
        <textarea
          {...input}
          className={`form-control  ${classNameField}`}
          placeholder="Leave a comment here"
          id={name}
        ></textarea>
        <label htmlFor={name}>{label}</label>
      </div>
    );
  };

  const onSubmit = (formValues) => {
    return props
      .sendEmailToContactPerson(formValues, props.memberId)
      .then((res) => {
        props.changeModal();
      });
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">
          Send email to Contact person
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div className="row">
            <div className="col">
              <Field
                name="firstName"
                type="text"
                component={renderTextField}
                label="First Name"
                className="w-50"
              />
            </div>
            <div className="col">
              <Field
                className="w-50"
                name="lastName"
                type="text"
                component={renderTextField}
                label="Last Name"
              />
            </div>
          </div>

          <Field
            name="email"
            type="email"
            info={true}
            component={renderTextField}
            label="Email"
          />

          <Field
            name="message"
            component={renderTextArea}
            classNameField="h-100"
            label="Message"
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              className="btn  btn-outline-danger btn-lg  w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button
              className="btn  btn-outline-primary  w-150 btn-lg"
              type="submit"
            >
              Send
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { sendEmailToContactPerson })(
  reduxForm({
    form: "contactPersonForm", // a unique identifier for this form
    validate,
  })(ContactPersonForm)
);
