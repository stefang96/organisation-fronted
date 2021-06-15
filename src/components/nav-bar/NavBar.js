import React from "react";
import NavBarItem from "./NavBarItem";
import { NavLink } from "react-router-dom";
const NavBar = (props) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark  "
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/news">
          Logo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <NavBarItem />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
