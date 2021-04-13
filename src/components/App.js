import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import SetPassword from "./auth/SetPassword";
import history from "../history";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ResetPassword from "./auth/ResetPassword";
import NewsList from "./news/NewsList";
import { connect } from "react-redux";
import NavBar from "./nav-bar/NavBar";
import OrganisationList from "./organisation/OrganisationList";
import SingleNews from "./news/SingleNews";
import "bootstrap/dist/css/bootstrap.min.css";
import { isLogin } from "../middleware/auth";
import Logout from "./auth/Logout";

function App(props) {
  return (
    <div>
      <Router history={history}>
        <NavBar />
        <Switch>
          <PublicRoute
            component={SetPassword}
            restricted={true}
            exact
            path="/set-password"
          />
          <PublicRoute
            component={LoginPage}
            restricted={true}
            exact
            path="/login"
          />
          <PublicRoute
            component={RegisterPage}
            restricted={true}
            exact
            path="/register"
          />
          <PublicRoute
            component={ResetPassword}
            restricted={true}
            exact
            path="/reset-password"
          />

          <Switch>
            <PublicRoute component={NewsList} exact path="/" />
            <PublicRoute component={NewsList} exact path="/news" />
            <PublicRoute component={SingleNews} exact path="/news/:newsId" />
            <PublicRoute
              component={OrganisationList}
              exact
              path="/organisation"
            />
            <PrivateRoute component={Logout} exact path="/logout" />
          </Switch>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(App);
