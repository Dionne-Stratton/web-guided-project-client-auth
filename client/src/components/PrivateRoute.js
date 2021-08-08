import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest}) => { // speading out the component to access everything in it
    return(<Route 
        {...rest}
        render={(props) => {
            if(localStorage.getItem("token")) {
                return <Component {...props}/>; // if token is in localStorage the render the protected page
            } else {
                return <Redirect to="/login"/>; // else redirect back to login page
            }
        }

        }
    />)
}