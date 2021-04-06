import React from "react";

const Modal = (props) => {
  if (props.show) {
    return (
      <div class="modal-form">
        <div class="modal-form-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
