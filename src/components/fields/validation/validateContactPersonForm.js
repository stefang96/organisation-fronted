/**
 * Function for validating fields
 */

export default (formValues) => {
  const errors = {};
  const emailRegex =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!formValues.email.match(emailRegex)) {
    errors.email = "Invalid email";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!formValues.firstName) {
    errors.firstName = "First name is required";
  }

  return errors;
};
