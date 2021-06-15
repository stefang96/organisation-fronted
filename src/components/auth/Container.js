import React from "react";

import "./container.css";

const Container = (props) => {
  return (
    <>
      <div className="flex-container">
        <div className="bg-overlay"></div>
        <div className="contents">
          <div className="contents-form">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Container;
