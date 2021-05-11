import React, { useState } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import validate from "../../fields/validation/validateNews";
import { connect } from "react-redux";
import { createNews } from "../../../actions/index";
import renderFileField from "../../fields/renderFileField";
import renderTextArea from "../../fields/renderTextArea";

const CreateNews = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const onSubmit = (formValues) => {
    console.log(file);
    console.log(formValues);
    const formData = new FormData();
    if (file) formData.append("file", file);

    Object.keys(formValues).forEach((key) =>
      formData.append(key, formValues[key])
    );

    props.createNews(formData, props.memberId);
    props.changeModal();
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
          <div className="row">
            <div>
              {file && <img src={fileUrl} className="h-200" alt="file" />}
            </div>
            <div className="col">
              <Field
                name="file"
                changeFile={changeFile}
                component={renderFileField}
                label="Upload file"
              />
            </div>
            <div className="col">
              <Field
                name="title"
                type="text"
                component={renderTextField}
                label="Title"
              />
            </div>
          </div>
          <Field
            name="shortDescription"
            component={renderTextArea}
            classNameField="min-h-100"
            label="Short description"
          />
          <Field
            name="description"
            component={renderTextArea}
            classNameField="min-h-150"
            label="Description"
          />
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
              Create
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default connect(null, { createNews })(
  reduxForm({
    form: "createNewsForm", // a unique identifier for this form
    validate,
    enableReinitialize: true,
    touchOnBlur: false,
  })(CreateNews)
);
