import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBarItem = (props) => {
  const navBarLeftItems = [
    { class: "  nav-item", name: "News", to: "/news" },
    { class: "nav-item", name: "Organisation", to: "/organisation" },
  ];

  const navBarRightItems = [
    { class: "glyphicon glyphicon-log-in", name: "Login", to: "/login" },
    { class: " ", name: "Register", to: "/register" },
  ];

  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {navBarLeftItems.map((item) => {
          return (
            <li key={item.name} className={item.class}>
              <NavLink className="nav-link  " to={item.to}>
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ul className="nav navbar-nav navbar-right">
        {navBarRightItems.map((item) => {
          return (
            <li key={item.name} className="nav-item">
              <NavLink to={item.to} className="nav-link">
                {" "}
                <span className={item.class}></span> {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavBarItem;
