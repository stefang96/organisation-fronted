/**
 * Function for validating fields
 */

export default formValues => {

    const errors = {};  
    const passRegex = `(?=.*[0-9])`;
    
    if (!formValues.password) {
      errors.password = "Password is empty";
    }
    if (!formValues.rePassword) {
      errors.rePassword = "Password is empty";
    }
     
    if (
      formValues.rePassword &&
      !formValues.rePassword.match(passRegex)
    ) {
      errors.rePassword =
        "The string must contain at least 1 numeric character.";
    } else if (  formValues.rePassword &&
       formValues.rePassword.toString().length<6){
      errors.rePassword =
      "The string must be six characters or longer";
    } else if ( 
      formValues.rePassword !== formValues.password
    ) {
      errors.rePassword = "Password does not match";
    }
  
    return errors;
  };
  