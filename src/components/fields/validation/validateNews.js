/**
 * Function for validating fields
 */

export default (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is required";
  }
  if (!formValues.short_description) {
    errors.short_description = "Description is required";
  }

  return errors;
};
