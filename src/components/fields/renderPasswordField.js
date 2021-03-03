import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";


export default ({ input, label, type, meta: { touched, error, warning } }) => (
 


  <div className="mb-3">
  <label  className="form-label">{label}</label>
  <input  {...input}  type={type}   className="form-control" placeholder={label}
      />
     
              {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
         
  </div>
  )
 
 
