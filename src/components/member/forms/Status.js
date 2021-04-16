import React from "react";
import { Modal, Button, closeButton } from "react-bootstrap";

const Status = () => {
  return (
    <div>
      <Modal.Header className="app-bg-color" closeButton>
        <Modal.Title className="m-auto color-white">Status modal</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-70">Bodyyy</Modal.Body>
      <Modal.Footer>Footer</Modal.Footer>
    </div>
  );
};

export default Status;
