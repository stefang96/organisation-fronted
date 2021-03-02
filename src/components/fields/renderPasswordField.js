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

   
  // TODO: Better input field ID handling
  const id = input.name ? input.name : "standard-adornment-password"; 
    return (
        <input
         {...input}
        
        />
           
        
            
            
         
      );
     
  }
 
 
