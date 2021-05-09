import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateContactPersonForm";
import { connect } from "react-redux";
import { addPayments } from "../../../actions/index";

const AddPayments = (props) => {
  const onSubmit = (formValues) => {
    props.addPayments(formValues);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Add Payments</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <Field
            name="price"
            component={renderTextField}
            label="Price"
            type="text"
          />
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
              Add
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { addPayments })(
  reduxForm({
    form: "addPaymentsForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(AddPayments)
);
