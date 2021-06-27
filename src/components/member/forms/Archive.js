import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { deleteMember, getMemberById } from "../../../actions/index";

const Archive = (props) => {
  useEffect(() => {
    props.getMemberById(props.memberId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.memberId]);

  const onSubmit = (formValues) => {
    props.deleteMember(props.memberId);
    props.changeModal();
  };
  return (
    <div>
      <Modal.Header className="app-bg-color-red" closeButton>
        <Modal.Title className="m-auto color-white">Remove member</Modal.Title>
      </Modal.Header>

      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <h5>
            Do you want to remove member
            <b>
              {" "}
              {props.member &&
                props.member.firstName + " " + props.member.lastName}
            </b>
            ?
          </h5>
          <p>
            If you delete this user, all his news will be automatically removed!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-left-button">
            <button
              onClick={props.changeModal}
              type="button"
              className="btn  btn-outline-danger    w-150"
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
  const member = state.member.member;
  return {
    member,
  };
};

export default connect(mapStateToProps, { deleteMember, getMemberById })(
  reduxForm({
    form: "deleteMemberForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(Archive)
);
