import React from 'react'
import {Switch,Router,Route} from 'react-router-dom'
import SetPassword from './auth/SetPassword';
import history from '../history'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ResetPassword from './auth/ResetPassword';
 

function App() {
  return (
    <div> 
    <Router history={history}>
      <Switch>
        <PublicRoute component={SetPassword} restricted={true}  exact path="/set-password" />
        <PublicRoute component={LoginPage} restricted={true}  exact path="/login" />
        <PublicRoute component={RegisterPage} restricted={true}  exact path="/register" />
        <PublicRoute component={ResetPassword} restricted={true}  exact path="/reset-password" />
        <PrivateRoute component={ResetPassword}    exact path="/" />
      </Switch>
    </Router>
    </div>
    
  );
}

export default App;
