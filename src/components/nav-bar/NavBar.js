import React from "react";
import NavBarItem from "./NavBarItem";

const NavBar = (props) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark  "
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          Container
        </a>
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
