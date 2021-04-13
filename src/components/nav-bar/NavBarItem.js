import React from "react";
import { Link, NavLink } from "react-router-dom";
import { isLogin } from "../../middleware/auth";

const NavBarItem = (props) => {
  const privateItems = [
    { class: "  nav-item", name: "News", to: "/news" },
    { class: "nav-item", name: "Organisation", to: "/organisation" },
  ];

  const publicItems = [
    { class: "glyphicon glyphicon-log-in", name: "Login", to: "/login" },
    { class: " ", name: "Register", to: "/register" },
  ];

  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

      <ul className="nav navbar-nav navbar-right">
        {privateItems.map((item) => {
          return (
            <li key={item.name} className={`${item.class} navbar-brand`}>
              <NavLink className="nav-link  " to={item.to}>
                {item.name}
              </NavLink>
            </li>
          );
        })}

        {!isLogin() ? (
          publicItems.map((item) => {
            return (
              <li key={item.name} className="navbar-brand">
                <NavLink
                  to={item.to}
                  className=" nav-link btn btn-outline-app w-150 "
                >
                  {" "}
                  <span className={item.class}></span> {item.name}
                </NavLink>
              </li>
            );
          })
        ) : (
          <li className=" navbar-brand dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              User
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <NavLink className="dropdown-item" to="/news-a">
                  News
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/news-a">
                  News
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <NavLink className="dropdown-item" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavBarItem;
