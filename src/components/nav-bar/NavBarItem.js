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
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

      <ul className="nav navbar-nav navbar-right">
        {navBarLeftItems.map((item) => {
          return (
            <li key={item.name} className={`${item.class} navbar-brand`}>
              <NavLink className="nav-link  " to={item.to}>
                {item.name}
              </NavLink>
            </li>
          );
        })}
        {navBarRightItems.map((item) => {
          return (
            <li key={item.name} className="  navbar-brand">
              <NavLink
                to={item.to}
                className=" nav-link btn btn-outline-app w-150 "
              >
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
