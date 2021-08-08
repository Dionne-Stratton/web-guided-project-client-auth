import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import GasPrices from './components/GasPrices';
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { PrivateRoute } from './components/PrivateRoute';

import axios from 'axios';

function App() {
  //setting state to keep track of whether or not the user is logged in to be used in render a particular part of the nav through showLink function on line 27
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    axiosWithAuth()
    .post("/logout") // because of baseURL in axiosWithAuth, we only need the last part of the api call here
    .then (req => {
      localStorage.removeItem("token") // deletes the token from storage requiring the user to log in again in order to access restricted data
      setIsLoggedIn(false)
    })
    .catch(err => {
      console.log(err);
    })
  };

  const showLink = () => { // used to only show "Protected Page" button if the user is logged in.
    if (isLoggedIn) {
      return (
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      );
    } else {
      return (<div></div>)
    }
  }


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          {
            showLink()
          }
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} /> 
          {/* only displays the above page if the parameters in PrivateRoute component are met */}
          <Route path="/login" render={(props) => {
            return <Login {...props} setIsLoggedIn={setIsLoggedIn} />
          }} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
