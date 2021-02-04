import React from 'react'
import {Switch,Router,Route} from 'react-router-dom'
import SetPassword from './auth/SetPassword';
import { createBrowserHistory } from 'history'; 
import PublicRoute from './PublicRoute'
 

function App() {
  return (
    <div> 
    <Router history={createBrowserHistory()}>
      <Switch>
        <PublicRoute component={SetPassword} restricted={true}  exact path="/set-password" />
      </Switch>
    </Router>
    </div>
    
  );
}

export default App;
