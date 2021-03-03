import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../nav-bar/NavBar'
import './container.css'
 

const Container = (props) => {
    return (

      <>
      
      
       
        <div className="flex-container">
           <div className="bg-overlay"></div>
        <div className="contents"> 
          <div className="contents-form">
          {props.children}
          </div>

          <div className="contents-text">
           <h1>Organisation</h1>  
          </div>
        </div>
      
      </div>
      </>
    )
}

export default Container
