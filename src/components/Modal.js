import React from "react";

const Modal = (props) => {
  if (props.show) {
    return (
      <div className="modal-form">
        <div className="modal-form-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
