import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  removeOrganisation,
  getOrganisationById,
} from "../../../actions/index";

const RemoveOrganisation = (props) => {
  useEffect(() => {
    props.getOrganisationById(props.organisationId);
  }, [props.organisationId]);

  const onSubmit = (formValues) => {
    console.log(formValues);
    props.removeOrganisation(props.organisationId);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color-red" closeButton>
        <Modal.Title className="m-auto color-white">
          Remove organisation
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <h5>
            Do you want to remove organisation
            <b> {props.organisation && props.organisation.name} </b>?
          </h5>
          <p>
            If you remove this organisation, all its users and user news will be
            remove automatically
          </p>
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
              Remove
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const organisation = state.organisation.organisation;
  return {
    organisation,
  };
};

export default connect(mapStateToProps, {
  removeOrganisation,
  getOrganisationById,
})(
  reduxForm({
    form: "removeOrganisationForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(RemoveOrganisation)
);
