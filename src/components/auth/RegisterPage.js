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
            <Field name="name" component={renderTextField} label="Name" type='text'  />
            <Field name="address" component={renderTextField} label="Address"  type='text'  />
            <div className="flex-wrap d-flex justify-content-between w-100" >
            <Field name="type" component={renderTextField} label="Type"  type='text'  />
            <Field name="numberOfEmployees" component={renderTextField} label="Number of Employees"   type='text' />
           </div>
          <div>
            <div className="color-blue d-flex flex-row justify-content-start mt-10">
                <span >Add contact person</span>
             </div>
            <div className="h-divider mb-15 mt-10"></div>
            <div className="flex-wrap d-flex justify-content-between w-100" >
                <Field name="firstName" component={renderTextField} label="First Name"  />
                <Field name="lastName" component={renderTextField} label="Last Name"     />
                
                
            </div>
            <Field name="email" component={renderTextField} label="Email"   type={"email"}  info={true}  />
          </div>
             
             
        <div className="d-grid gap-2">
              <button className="btn btn-primary   mt-30" type="submit">  Create organisation</button>
          </div>
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
