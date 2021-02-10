import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";


 

export default  ({
    label,
    input,
    classField,
    values,
    classes,
    handleClickShowPassword,
    handleMouseDownPassword,
    meta: { touched, invalid, error },
    ...custom
  }) => {

    const renderError=(error, touched)=>{
      if ((touched && error)   ) {
        return (
          <span className="form__error">{error ? error :'kkk'}</span>
        );
      }
    }

    let errorExist = false;
    if (touched && error) {
      errorExist = true;
    }
  // TODO: Better input field ID handling
  const id = input.name ? input.name : "standard-adornment-password"; 
    return (
        <FormControl
          className={clsx(
            classes.textField,
            "form__input w-100",
            classField
          )}
          error={errorExist}
        >
          <InputLabel htmlFor={id} >
            {label}
          </InputLabel>
          <Input
            {...input}
            id={id}
            required
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            error={touched && invalid}
             
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
          />
         {touched &&
         ((error && <span className="form__error" >{error}</span>)  
           )}
        </FormControl>
      );
     
  }
 
 
