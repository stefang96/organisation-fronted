import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { getLatestPayment } from "../../../actions/index";
import moment from "moment";

const StatusActive = (props) => {
  const { payment } = props;
  useEffect(() => {
    props.getLatestPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let c;
  if (payment) {
    const toDate = payment && payment.toDate;
    var a = moment();
    var b = moment.unix(toDate);
    c = b.diff(a, "days");
  }

  const body =
    props.payment &&
    `You are an   
            <b>  ACTIVE  </b>
           member of our organisation. <br/>
        You have paid a membership fee  <b> ${payment.fromDate &&
          moment
            .unix(payment.fromDate)
            .format("MMMM Do YYYY")}  </b>, in the amount of <b> ${
      payment.price
    } </b> $ .<br/> <br/>
        Your membership fee expires on   <b>${moment
          .unix(payment.toDate)
          .format("MMMM Do YYYY")}  </b> or in  <b> ${c && c}   </b> days.`;

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Status: Active</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-70">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-left-button">
          <button
            onClick={props.changeModal}
            type="button"
            className="btn  btn-outline-primary  w-150"
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
