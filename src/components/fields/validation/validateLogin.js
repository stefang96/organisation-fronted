/**
 * Function for validating fields
 */

export default formValues => {

   console.log({formValues})
    const errors = {};
    const emailRegex =
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    
    if (!formValues.email) {
      errors.email = "Invalid credentials";
    } else if (!formValues.email.match(emailRegex)) {
      errors.email = "Invalid credentials";
    }
    if (!formValues.password) {
      errors.password = "Invalid credentials";
    }
    
  
  
    return errors;
  };
  