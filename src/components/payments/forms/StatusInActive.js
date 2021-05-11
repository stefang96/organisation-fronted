import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";

import { connect } from "react-redux";
import { addPayments, getLatestPayment } from "../../../actions/index";

const validate = (formValues) => {
  const errors = {};
  if (!formValues.price) {
    errors.price = "Price required";
  }

  return errors;
};

const StatusInActive = (props) => {
  const { payment } = props;
  useEffect(() => {
    props.getLatestPayment();
  }, []);

  const onSubmit = (formValues) => {
    props.addPayments(formValues);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">
          Status: In Active
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div>
            Vasa clanarina je istekla {payment.toDate}. <br /> Clanarina za
            nerednu godinu iznosi: 250$. <hr />
          </div>

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
              className="btn  btn-outline-danger  w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button className="btn  btn-outline-primary  w-150 " type="submit">
              Pay
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    payment: state.payment.payment,
  };
};

export default connect(mapStateToProps, { addPayments, getLatestPayment })(
  reduxForm({
    form: "addPaymentsForm", // a unique identifier for this form
    enableReinitialize: true,
    validate,
    touchOnBlur: false,
  })(StatusInActive)
);
