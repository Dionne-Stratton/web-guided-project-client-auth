import React from "react";

import { Route, Redirect } from "react-router-dom";

// This is going to do a few things
// 1. wrap the plain Route component and pass in the same props.
// 2. check to see if we are logged in, if yes, render component
// 3. if the user is not logged in , redirect login

const PrivateRoute = (props) => {
  return <Route {...props} />;
};

export default PrivateRoute;
