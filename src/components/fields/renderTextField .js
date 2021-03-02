import React from 'react'
 
 

 

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
   
    <input
        
        {...input}
        {...custom}
    />
     
   
   )   
     
  }
 
 
