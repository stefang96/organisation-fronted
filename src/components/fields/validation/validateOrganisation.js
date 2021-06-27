/**
 * Function for validating fields
 */

export default (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Name is required";
  }
  if (!formValues.price) {
    errors.price = "Price is required";
  }
  if (!formValues.contactPerson) {
    errors.contactPerson = "Contact person is required";
  }

  return errors;
};
