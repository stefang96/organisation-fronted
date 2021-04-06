/**
 * Function for validating fields
 */
export default (formValues) => {
  const errors = {};
  const emailRegex =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

  if (!formValues.email) {
    errors.email = "Email required";
  } else if (!formValues.email.match(emailRegex)) {
    errors.email = "Invalid email";
  }
  if (!formValues.name) {
    errors.name = "Name required";
  }

  if (!formValues.type) {
    errors.type = "Type required";
  }
  if (!formValues.numberOfEmployees) {
    errors.numberOfEmployees = "Number of employees required";
  }
  if (!formValues.firstName) {
    errors.firstName = "First Name required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last Name required";
  }
  if (!formValues.name) {
    errors.name = "Name required";
  }

  return errors;
};
