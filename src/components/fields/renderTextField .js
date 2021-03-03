import React from 'react'
 
 

export default  ({ input, label,info, type, meta: { touched, error, warning } }) => (

    <div className="mb-3">
              <label   className="form-label">{label}</label>
              <input  {...input}   type={type} className="form-control"    placeholder={label} />
             
              {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
       
          
              {info && (<div className="form-text">We'll never share your email with anyone else.</div>)}  
          </div>
    
  )
 
 
 
