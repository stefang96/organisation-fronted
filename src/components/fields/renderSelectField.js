import React from "react";

export default ({
  input,
  label,
  disabled,
  children,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="form-group mb-3">
    <label className="form-label">{label}</label>
    <select
      className="form-select"
      disabled={disabled}
      aria-label="Default select example"
      {...input}
    >
      {children}
    </select>

    {touched &&
      ((error && <span className="text-danger">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);
