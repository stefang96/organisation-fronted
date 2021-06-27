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

  if (!formValues.price) {
    errors.price = "Price is required";
  }

  if (!formValues.firstName) {
    errors.firstName = "First Name is required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!formValues.name) {
    errors.name = "Name is required";
  }

  return errors;
};
