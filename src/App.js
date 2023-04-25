import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import Home from "./MAIN/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Quizinstructions from "./MAIN/Quiz/Quizinstructions";
import AdminAuth from "./components/AdminAuth";
import AdminDash from "./components/Admin/AdminDash";
import Quiz from "./MAIN/Quiz/Quiz";
import AdminDelete from "./components/Admin/AdminDelete";


function PrivateRoute({ element: Component, isAuthenticated, ...rest }) {
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace={true} />
  );
}

function AdminRoute({ element: Component, isAuthenticated, ...rest }) {
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/AdminAuth" replace={true} />
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <Container style={{ width: "400px" }}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace={true} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={Home}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/quizinstructions"
          element={
            <PrivateRoute
              element={Quizinstructions}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/adminauth"
          element={<AdminAuth setIsAdminAuthenticated={setIsAdminAuthenticated} />}
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute element={Quiz} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/admindash"
          element={
            <AdminRoute
              element={AdminDash}
              isAuthenticated={isAdminAuthenticated}
            />
          }
        />
        <Route
          path="/admindelete"
          element={
            <AdminRoute
              element={AdminDelete}
              isAuthenticated={isAdminAuthenticated}
            />
          }
        />
       
      </Routes>
    </Container>
  );
}

export default App;
