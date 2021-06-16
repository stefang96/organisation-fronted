import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import moment from "moment";
import { connect } from "react-redux";
import { addPayments, getLatestPayment } from "../../../actions/index";
import getLoggedUser from "../../../utils/getLoggedUser";

const validate = (formValues) => {
  const loggedUser = getLoggedUser();
  const errors = {};

  if (
    loggedUser &&
    Number(loggedUser.organisation.price) !== Number(formValues.price)
  ) {
    errors.price = `The membership fee for the following year is: ${loggedUser.organisation.price}$`;
  }
  if (!formValues.price) {
    errors.price = "Price required";
  }

  return errors;
};

const StatusInActive = (props) => {
  const { payment } = props;
  const loggedUser = getLoggedUser();
  useEffect(() => {
    props.getLatestPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formValues) => {
    props.addPayments(formValues);
    props.changeModal();
  };
  let body;
  if (payment) {
    body = `You are no longer an active member of our organisation. <br/>
  Your membership fee has expired   <b>${moment
    .unix(payment.toDate)
    .format(
      "MMMM Do YYYY"
    )} </b> and you no longer have the opportunity to publish news about our organisation. <br/>
  If you want to extend the membership fee, pay the amount below.  <br/>  <br/>
  
  The membership fee for the following year is:   <b> ${loggedUser &&
    loggedUser.organisation.price}$  </b> . <br/> <br/>`;
  } else {
    body = `You are not an active member of our organisation. <br/>
  And you don't have the opportunity to publish news about our organisation.
  If you want to pay the membership fee, pay the amount below.
  
  The membership fee for the following year is: <b> ${loggedUser &&
    loggedUser.organisation.price}$  </b> .  <br/> <br/>`;
  }

  return (
    <div>
      <Modal.Header className="app-bg-color-red" closeButton>
        <Modal.Title className="m-auto color-white">
          Status: In Active
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div dangerouslySetInnerHTML={{ __html: body }} />

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
