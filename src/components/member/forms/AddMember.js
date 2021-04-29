import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateContactPersonForm";
import { connect } from "react-redux";
import { addMember } from "../../../actions/index";
import renderSelectField from "../../fields/renderSelectField";
import loggedUser from "../../../utils/getLoggedUser";

const AddMember = (props) => {
  const user = loggedUser();

  const onSubmit = (formValues) => {
    console.log(formValues);
    props.addMember(formValues);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Add member</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div className="row">
            <div class="col">
              <Field
                name="firstName"
                type="text"
                component={renderTextField}
                label="First Name"
                className="w-50"
              />
            </div>
            <div class="col">
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
            info={false}
            component={renderTextField}
            label="Email"
          />
          <div className="row">
            <div class="col">
              <Field
                name="phone"
                type="text"
                component={renderTextField}
                label="Phone"
                className="w-50"
              />
            </div>
            <div class="col">
              <Field
                className="w-50"
                name="role"
                disabled={user.role === "member" ? true : false}
                component={renderSelectField}
                label="Role"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Field>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              class="btn  btn-outline-danger  w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button class="btn  btn-outline-primary  w-150 " type="submit">
              Create
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { addMember })(
  reduxForm({
    form: "addMemberForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(AddMember)
);
