/**
 * Function for validating fields
 */

export default (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is required";
  }
  if (!formValues.shortDescription) {
    errors.shortDescription = "Short Description is required";
  }

  return errors;
};
