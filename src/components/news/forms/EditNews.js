import React, { useEffect, useState } from "react";
import { Modal, Button, closeButton } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../../fields/renderTextField ";
import { connect } from "react-redux";
import { getNewsById, updateNews } from "../../../actions/index";
import renderFileField from "../../fields/renderFileField";

const EditNews = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    props.getNewsById(props.newsId);
  }, [props.newsId]);

  const renderTextArea = ({ input, label, name, classNameField }) => {
    return (
      <div className=" mt-30 form-floating">
        <textarea
          {...input}
          className={`form-control  ${classNameField}`}
          placeholder="Leave a comment here"
          id={name}
        ></textarea>
        <label htmlFor={name}>{label}</label>
      </div>
    );
  };

  const onSubmit = (formValues) => {
    console.log(file);
    console.log(formValues);

    const formData = new FormData();
    if (file) formData.append("file", file);

    Object.keys(formValues).forEach((key) =>
      formData.append(key, formValues[key])
    );
    props.updateNews(props.newsId, formData, props.memberId, props.profile);
    props.changeModal();
  };

  const changeFile = (file) => {
    setFileUrl(URL.createObjectURL(file));
    setFile(file);
  };
  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Edit news</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="px-70">
          <div className=" row">
            <div>
              {fileUrl ? (
                <img src={fileUrl} className="h-200" alt="file" />
              ) : (
                props.filePath && (
                  <img src={props.filePath} className="h-200" alt="file" />
                )
              )}
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
              Save
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const news = state.news.news && state.news.news;

  const initialValues = news && {
    title: news.title,
    description: news.description,
    shortDescription: news.shortDescription,
  };
  const fileName = news && news.fileName;
  const filePath = news && news.filePath;

  return {
    initialValues,
    fileName,
    filePath,
  };
};

export default connect(mapStateToProps, { getNewsById, updateNews })(
  reduxForm({
    form: "editNewsForm", // a unique identifier for this form
    enableReinitialize: true,
    touchOnBlur: false,
  })(EditNews)
);
