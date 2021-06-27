import React from "react";

export default ({
  input,
  label,
  name,
  classNameField,
  meta: { touched, error, warning },
}) => (
  <div className=" mt-3 form-floating">
    <textarea
      {...input}
      className={`form-control  ${classNameField}`}
      placeholder="Leave a comment here"
      id={name}
    ></textarea>
    <label htmlFor={name}>{label}</label>

    {touched &&
      ((error && <span className="text-danger">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);
