  
  import React from 'react';
import useQuery from '../../utils/getQuery'
import { reduxForm,Field } from 'redux-form' 
import { withStyles } from "@material-ui/core/styles";
import Container from './Container';
import renderPasswordField from '../fields/renderPasswordField';
import {setPassword} from '../../actions/index'
import validate from '../fields/validation/validateSetPassword'
import {connect} from 'react-redux';
 
 
 const SetPassword =(props)=> {
  const classes = withStyles();

  
  

  let query = useQuery();
  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
 
  const onSubmit = formValues => {
    
  console.log(query.get('email'))
  console.log(query.get('setpasswordtoken'))
  console.log(query.get('verifytoken'))
    console.log(formValues)
    
  
    const email = query.get("email");
    const token = query.get("setpasswordtoken");
   
    props.setPassword(formValues,email,token)
   
  };
 


  return (
 
    <Container>
      <>
      <h3 className="public-title" >Set password</h3>
      <form   className={(classes.root, "form")}  onSubmit={props.handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Field
          name="password"
          component={renderPasswordField}
          label="Password"
        />
        <Field
          name="rePassword"
          component={renderPasswordField}
          label="Confirm Password"
        />

        <div className="d-grid gap-2">
              <button className="btn btn-primary br-30  mt-10" type="submit">    Save and login</button>
          </div>
       
            
        </form>
          </>
    </Container>            
  );
}

 
export default connect(null,{
  setPassword
})( reduxForm({
  form: 'setPassword', // a unique identifier for this form
  validate,
  
})(SetPassword))
 
