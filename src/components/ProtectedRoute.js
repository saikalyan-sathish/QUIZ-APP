import React from "react";
import { Navigate } from "react-router-dom";
import  { useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
import { auth } from "../Firebase";

import { Route, Redirect ,Routes} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';



const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);


  return (
    <Routes>
    <Route
      {...rest}
      render={(props) => {
        !loading && user ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        );
      }}
    />
    </Routes>
  );
};

export default ProtectedRoute;


