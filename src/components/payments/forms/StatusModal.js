import React from "react";
import StatusActive from "./StatusActive";
import StatusInActive from "./StatusInActive";

const StatusModal = (props) => {
  const { changeModal, active, id } = props;
  return active ? (
    <StatusActive changeModal={changeModal} id={id} />
  ) : (
    <StatusInActive changeModal={changeModal} id={id} />
  );
};

export default StatusModal;
