import React from "react";

export default ({
  input,
  label,
  disabled,
  info,
  name,
  changeFile,
  type,
  meta: { touched, error, warning },
}) => {
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    changeFile(event.target.files[0]);
  };

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">
        {label}
      </label>
      <input
        onChange={(e) => handleChange(e)}
        className="form-control"
        type="file"
        id="formFile"
        name={name}
      />

      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};
