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
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quizinstructions" element={<Quizinstructions />} />
        <Route
          path="/adminauth"
          element={<AdminAuth setIsAdminAuthenticated={setIsAdminAuthenticated} />}
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/admindelete" element={<AdminDelete />} />
      
      </Routes>
    </Container>
  );
}

export default App;
