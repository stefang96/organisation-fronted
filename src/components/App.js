import React from 'react'
import {Switch,Router,Route} from 'react-router-dom'
import SetPassword from './auth/SetPassword';
import history from '../history'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ResetPassword from './auth/ResetPassword';
import NewsList from './news/NewsList';
 
import NavBar from './nav-bar/NavBar';
import OrganisationList from './organisation/OrganisationList';
 

function App() {
  
  return (
    <div> 
      
    <Router history={history}>
    <NavBar />
    
    <Switch>
        <PublicRoute component={SetPassword} restricted={true}  exact path="/set-password" />
        <PublicRoute component={LoginPage} restricted={true}  exact path="/login" />
        <PublicRoute component={RegisterPage} restricted={true}  exact path="/register" />
        <PublicRoute component={ResetPassword} restricted={true}  exact path="/reset-password" />

        <div  className="container-body" >
        <PublicRoute component={NewsList}  exact path="/" />
        <PublicRoute component={NewsList}  exact path="/news" />
        <PublicRoute component={OrganisationList}  exact path="/organisation" />
        </div>
      </Switch>
    
       

      
    </Router>
    </div>
    
  );
}

export default App;
