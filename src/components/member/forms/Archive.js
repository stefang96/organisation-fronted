import React from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm } from "redux-form";

import { connect } from "react-redux";
import { archiveMember } from "../../../actions/index";

const Archive = (props) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  return (
    <div>
      <Modal.Header className="app-bg-color-red" closeButton>
        <Modal.Title className="m-auto color-white">Archive member</Modal.Title>
      </Modal.Header>

      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <h5>
            {" "}
            Archive{" "}
            <b>
              {" "}
              {props.member &&
                props.member.firstName + " " + props.member.lastName}{" "}
            </b>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              class="btn  btn-outline-danger    w-150"
            >
              Close
            </button>
          </div>
          <div className="modal-right-button">
            <button class="btn  btn-outline-primary  w-150 " type="submit">
              Archive
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const member = state.member.member;
  return {
    member,
  };
};

export default connect(mapStateToProps, { archiveMember })(
  reduxForm({
    form: "archiveMemberForm", // a unique identifier for this form
  })(Archive)
);
