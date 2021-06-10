import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateOrganisation";
import { connect } from "react-redux";
import {
  updateOrganisation,
  getOrganisationById,
  getOrganisationAdmins,
} from "../../../actions/index";
import renderSelectField from "../../fields/renderSelectField";
import loggedUser from "../../../utils/getLoggedUser";

const EditOrganisation = (props) => {
  const user = loggedUser();

  useEffect(() => {
    props.getOrganisationById(props.organisationId);
    props.getOrganisationAdmins(props.organisationId);
  }, [props.organisationId]);

  const onSubmit = (formValues) => {
    console.log(formValues);
    props.updateOrganisation(props.organisationId, formValues);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">
          Update Organisation
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
                name="price"
                component={renderTextField}
                label="Price"
                type="number"
              />
            </div>
            <div className="col">
              <Field
                className="w-50"
                name="contactPerson"
                component={renderSelectField}
                label="Contact Person"
              >
                {props.organisationAdmins &&
                  props.organisationAdmins.map((admin) => {
                    return (
                      <option value={admin.id}>
                        {admin.firstName + " " + admin.lastName}
                      </option>
                    );
                  })}
              </Field>
            </div>
          </div>
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
                type="number"
              />
            </div>
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
              Save
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const organisation = state.organisation.organisation;
  const contactPerson =
    state.organisation.organisation.contactPerson &&
    state.organisation.organisation.contactPerson.id;

  const initialValues = {
    name: organisation.name,
    type: organisation.type,
    address: organisation.address,
    numberOfEmployees: organisation.numberOfEmployees,
    contactPerson: contactPerson,
  };
  return {
    organisationAdmins: state.organisation.organisationAdmins,
    initialValues,
  };
};

export default connect(mapStateToProps, {
  updateOrganisation,
  getOrganisationById,
  getOrganisationAdmins,
})(
  reduxForm({
    form: "updateOrganisationForm", // a unique identifier for this form
    validate,
    enableReinitialize: true,
    touchOnBlur: false,
  })(EditOrganisation)
);
