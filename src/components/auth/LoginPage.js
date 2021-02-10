  
import React from 'react';
import { reduxForm,Field } from 'redux-form' 
import { withStyles } from "@material-ui/core/styles";
import Container from './Container';
import renderPasswordField from '../fields/renderPasswordField';
import renderTextField from '../fields/renderTextField ';
import { Link } from 'react-router-dom';
import validate from '../fields/validation/validateLogin'
import './login.scss'
import {login} from '../../actions/index'
import { connect } from 'react-redux';
  

 
   
  
const LoginPage =(props)=> {
    const classes = withStyles();
  
   
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
      console.log(formValues)
   //   const data = formValues.get("rePassword");
     // const email = getParameterByName("email");
    //  const token = getParameterByName("setpasswordtoken");
    //  props.setPassword(data, email, token);
      props.login(formValues)
    };
   
  
  
    return (
   
    <Container>
      <>
        <h3 className="public-title" >Welcome back!</h3>
        <form    className={(classes.root, "form")}  onSubmit={props.handleSubmit(onSubmit)} noValidate>
            <Field name="email" component={renderTextField} label="Email" />
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
          
  
            <button type="submit" className="btn mt-50 mb-15 btn--fluid  ">
                Login
            </button>   
        </form>
        <div  className="login__links" >
            <div>
                <Link to="/reset-password"  className="" >Forgot your password?</Link>
            </div>
            <div>
                <Link to="/register">Don't have an account? Sign Up</Link>
            </div>
        </div>
          
        </>
      </Container>          
       
         
    );
  }
  
   
  export default  connect(null,{login})(reduxForm({
    form: 'loginForm', // a unique identifier for this form
    validate
  })(LoginPage))
  