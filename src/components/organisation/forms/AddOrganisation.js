import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateContactPersonForm";
import { connect } from "react-redux";
import { addOrganisation } from "../../../actions/index";
import renderSelectField from "../../fields/renderSelectField";
import loggedUser from "../../../utils/getLoggedUser";

const AddOrganisation = (props) => {
  const onSubmit = (formValues) => {
    props.addOrganisation(formValues);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">
          Add Organisation
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
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
          <div className="row">
            <div className="col">
              <Field
                name="type"
                component={renderTextField}
                label="Type"
                type="text"
              />
            </div>
            <div className="col">
              <Field
                name="numberOfEmployees"
                component={renderTextField}
                label="Number of Employees"
                type="text"
              />
            </div>
          </div>
          <div>
            <div className="color-blue d-flex flex-row justify-content-start mt-10">
              <span>Add contact person</span>
            </div>
            <div className="h-divider mb-15 mt-10"></div>
            <div className="row">
              <div className="col">
                <Field
                  name="firstName"
                  component={renderTextField}
                  label="First Name"
                />
              </div>
              <div className="col">
                <Field
                  name="lastName"
                  component={renderTextField}
                  label="Last Name"
                />
              </div>
            </div>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              type={"email"}
              info={true}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              className="btn  btn-outline-danger  w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button className="btn  btn-outline-primary  w-150 " type="submit">
              Add
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { addOrganisation })(
  reduxForm({
    form: "addOrganisationForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(AddOrganisation)
);
