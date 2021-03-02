  
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
      return props.login(formValues)
    };
   

    return (
   
    <Container>
      <>
        <h3 className="public-title" >Welcome back!</h3>
        <form     onSubmit={props.handleSubmit(onSubmit)}  
        noValidate >

        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <Field name="email"  type="email" className="form-control"  component="input"  id="exampleInputEmail1" aria-describedby="emailHelp"placeholder="Email" />
            
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <Field type="password" data-toggle="password"   name="password" className="form-control" id="exampleInputPassword1"  placeholder="Password"
                component="input"
                label="Password"/>
          </div>
 
          <button class="btn-login " type="submit">Login</button>
   
         
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
  