import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";

import "@fontsource/roboto/400.css";
function AdminAuth() {     
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/AdminDash");
    } catch (err) {
      setError(err.message);
    }
  };
  function login(email,password){
    return(
        {email: "admin@gmail.com"
        ,password: 1234}
    )
  }
  return (
    <div>
      <div className="p-4 box">
        <h2 className="mb-3">AdminLogin</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="contained" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
        <br />
        If you are a user <Link to = "/Login">Userlogin</Link>
        <br/>
        If you are an admin <Link to="/AdminAuth">Admin login</Link>
      </div>
    </div>
  );
}

export default AdminAuth;
