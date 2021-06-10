import React, { useState } from "react";

export default ({ input, label, type, meta: { touched, error, warning } }) => {
  const [visibilePassword, setvisibilePassword] = useState(false);

  const passwordEye = () => {
    setvisibilePassword(!visibilePassword);
  };
  return (
    <div className="position__relative mb-3">
      <label className="form-label">{label}</label>
      <input
        {...input}
        type={!visibilePassword ? "password" : "text"}
        className="form-control"
        placeholder={label}
      />
      <div
        onClick={() => passwordEye()}
        className="  position__absolute password-eye"
      >
        <i
          className={`${
            !visibilePassword ? "bi bi-eye-slash-fill" : " bi bi-eye-fill"
          } `}
        ></i>
      </div>
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};
