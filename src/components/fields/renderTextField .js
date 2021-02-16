import React from 'react'
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";

 

export default  ({
    id,
    label,
    input,
    size,
    classField,
    variant,
    meta: { touched, invalid, error },
    ...custom
  }) => {
   return (
    <div className={clsx("text-field-wrapper", size)}>
    <TextField
        id={` ${id ?id  :'standard-basic'} `}
        className={clsx("form__input w-100  ", classField)}
       
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
     
    </div>  
   )   
     
  }
 
 
