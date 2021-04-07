import React from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import { connect } from "react-redux";

const ContactPersonForm = (props) => {
  const renderTextArea = ({ label, name }) => {
    return (
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id={name}
        ></textarea>
        <label for={name}>{label}</label>
      </div>
    );
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Send email to Contact person
        </Modal.Title>
      </Modal.Header>
      <form noValidate>
        <Modal.Body>
          <div className="flex-wrap d-flex justify-content-between w-100">
            <Field
              name="firstName"
              type="text"
              component={renderTextField}
              label="First Name"
            />

            <Field
              name="lastName"
              type="text"
              component={renderTextField}
              label="Last Name"
            />
          </div>

          <Field
            name="email"
            type="email"
            info={true}
            component={renderTextField}
            label="Email"
          />

          <Field name="message" component={renderTextArea} label="Message" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.changeModal}>Close</Button>
          <div className="d-grid gap-2">
            <button className="btn btn-primary br-30 mt-10" type="submit">
              Login
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null)(
  reduxForm({
    form: "contactPersonForm", // a unique identifier for this form
  })(ContactPersonForm)
);
