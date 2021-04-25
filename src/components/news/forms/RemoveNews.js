import React, { useState } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import { removeNews } from "../../../actions/index";

const RemoveNews = (props) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
    props.removeNews(props.newsId, props.memberId);
    props.changeModal();
  };

  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Edit news</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">Remove news?</Modal.Body>

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
              Remove
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { removeNews })(
  reduxForm({
    form: "removeNewsForm", // a unique identifier for this form
  })(RemoveNews)
);
