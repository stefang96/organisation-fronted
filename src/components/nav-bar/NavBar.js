import React from 'react'
import NavBarItem from './NavBarItem'

const NavBar = (props) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark  " aria-label="Eighth navbar example">
    <div class="container">
      <a class="navbar-brand" href="#">Container</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample07">
      <NavBarItem />
        
      </div>
    </div>
  </nav>
   
    )
}

export default NavBar
