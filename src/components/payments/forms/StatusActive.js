import React, { useEffect } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateContactPersonForm";
import { connect } from "react-redux";
import { getLatestPayment } from "../../../actions/index";
import moment from "moment";
const StatusActive = (props) => {
  const { payment } = props;
  useEffect(() => {
    props.getLatestPayment();
  }, []);

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Status: Active</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-70">
        {props.payment &&
          `Uplatili ste clanarinu ${payment.fromDate &&
            moment
              .unix(payment.fromDate)
              .format("MMMM Do YYYY")} , vasa clanarina istice
  ${moment
    .unix(payment.toDate)
    .format("MMMM Do YYYY")}. Iznos clanarine iznosi ${payment.price}.`}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-left-button">
          <button
            onClick={props.changeModal}
            type="button"
            className="btn  btn-outline-danger  w-150"
          >
            OK
          </button>
        </div>
      </Modal.Footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    payment: state.payment.payment,
  };
};

export default connect(mapStateToProps, { getLatestPayment })(StatusActive);
