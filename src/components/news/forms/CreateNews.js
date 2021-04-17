import React, { useState } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";

import { connect } from "react-redux";
import { updateMember } from "../../../actions/index";
import renderFileField from "../../fields/renderFileField";

const CreateNews = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const renderTextArea = ({ input, label, name, classField }) => {
    return (
      <div className=" mt-30 form-floating">
        <textarea
          {...input}
          className={`form-control  ${classField}`}
          placeholder="Leave a comment here"
          id={name}
        ></textarea>
        <label for={name}>{label}</label>
      </div>
    );
  };
  const onSubmit = (formValues) => {
    console.log(file);
    console.log(formValues);
  };

  const changeFile = (file) => {
    setFileUrl(URL.createObjectURL(file));
    setFile(file);
  };
  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Create news</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div className=" row">
            {file && <img src={fileUrl} className="h-200" alt="file" />}
            <div className="col">
              <Field
                name="file"
                changeFile={changeFile}
                component={renderFileField}
                label="Upload file"
              />
            </div>
            <div class="col">
              <Field
                name="title"
                type="text"
                component={renderTextField}
                label="Title"
              />
            </div>
          </div>
          <Field
            name="short_description"
            component={renderTextArea}
            classField="min-h-100"
            label="Short description"
          />
          <Field
            name="description"
            component={renderTextArea}
            classField="min-h-150"
            label="Description"
          />
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
              Create
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null)(
  reduxForm({
    form: "createNewsForm", // a unique identifier for this form
  })(CreateNews)
);
