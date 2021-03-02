import React from 'react';
import { reduxForm,Field } from 'redux-form' 
import { withStyles } from "@material-ui/core/styles";
import Container from './Container';
import renderPasswordField from '../fields/renderPasswordField';
import renderTextField from '../fields/renderTextField ';
import { Link } from 'react-router-dom';
import validate from '../fields/validation/validateLogin'
import './login.scss'
import {register} from '../../actions/index'
import { connect } from 'react-redux';
 

const RegisterPage = (props) => {

    const onSubmit =(formValues)=>{
        console.log(formValues)
        props.register(formValues);
    }

    return (
   <Container>
      <>
        <h3 className="public-title" >Create organisation</h3>
        <form className="form"  onSubmit={props.handleSubmit(onSubmit)}  
        noValidate >
            <Field name="name" component={renderTextField} label="Name"  />
            <Field name="address" component={renderTextField} label="Address"    />
            <div className="flex-wrap d-flex justify-content-between w-100" >
            <Field name="type" component={renderTextField} label="Type"  classField="form__input--normal-margin w-100"  size="w-50"  />
            <Field name="numberOfEmployees" component={renderTextField} label="Number of Employees" classField="form__input--normal-margin w-100"  size="w-50" />
           </div>
          <div>
            <div className="color-blue d-flex flex-row justify-content-start mt-50">
                <span >Add contact person</span>
             </div>
            <div className="h-divider mb-15 mt-15"></div>
            <div className="flex-wrap d-flex justify-content-between w-100" >
                <Field name="firstName" component={renderTextField} label="First Name"  classField="form__input--normal-margin w-100"  size="w-50" />
                <Field name="lastName" component={renderTextField} label="Last Name"   classField="form__input--normal-margin w-100" size="w-50"  />
                <Field name="email" component={renderTextField} label="Email"    classField="form__input--normal-margin w-100"  size="w-50" />
                <Field name="phone" component={renderTextField} label="Phone"    classField="form__input--normal-margin w-100"  size="w-50" />
            </div>
          </div>
             
            <button type="submit" className="btn mt-50 mb-15 btn--fluid  ">
               Create organisation
            </button>   
        </form>
        <div  className="login__links" >
            <div>
                <Link to="/login"  className="login__links-right" >You already have an account please Sign in</Link>
            </div>
        </div>
          
        </>
      </Container>          
       
 )
}

export default connect(null,{register})(reduxForm({
    form:"registerForm"
}) (RegisterPage))
