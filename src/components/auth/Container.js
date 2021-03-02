import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../nav-bar/NavBar'
import './container.css'
import  {Navbar} from  'react-bootstrap'

const Container = (props) => {
    return (

      <>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" aria-label="Eighth navbar example">
    <div class="container">
      <a class="navbar-brand" href="#">Container</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample07">
      <NavBar />
        
      </div>
    </div>
  </nav>
   
      
       
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
