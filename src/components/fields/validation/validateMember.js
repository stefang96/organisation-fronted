/**
 * Function for validating fields
 */

export default (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "First name is required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!formValues.role) {
    errors.role = "Role is required";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  }

  return errors;
};
