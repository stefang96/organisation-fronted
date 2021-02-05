  
  import React from 'react';
import useQuery from '../../utils/getQuery'
import { reduxForm,Field } from 'redux-form' 
import { withStyles } from "@material-ui/core/styles";
import Container from './Container';
import renderPasswordField from '../fields/renderPasswordField';
import { useHistory } from "react-router-dom";

 

 

 const SetPassword =(props)=> {
  const classes = withStyles();
  const history = useHistory();

  let query = useQuery();
  const [values, setValues] = React.useState({
    showPassword: false
  });


  console.log(query.get('email'))
  console.log(query.get('setpasswordtoken'))
  console.log(query.get('verifytoken'))

 
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
 
  const onSubmit = formValues => {
    console.log(formValues)
 //   const data = formValues.get("rePassword");
   // const email = getParameterByName("email");
  //  const token = getParameterByName("setpasswordtoken");
  //  props.setPassword(data, email, token);
    history.push('/')
  };
 


  return (
 
    <Container>
      <>
      <h3 className="public-title" >Set password</h3>
      <form    className={(classes.root, "form")}  onSubmit={props.handleSubmit(onSubmit)} noValidate>
      <Field
          name="password"
          component={renderPasswordField}
          label="Password"
          values={values}
          classes={classes}
          classField="form__input--password"
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
         
        />
        <Field
          name="rePassword"
          component={renderPasswordField}
          classes={classes}
          label="Confirm Password"
          classField="form__input--password-margin"
          values={values}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
       
        />

        <button type="submit" className="btn mt-50 mb-15 btn--fluid  ">
          Save and login
        </button>
       
            
        </form>
          </>
    </Container>          
     
       
  );
}

 
export default reduxForm({
  form: 'setPassword' // a unique identifier for this form
})(SetPassword)
