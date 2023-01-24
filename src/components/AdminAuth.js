import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";

import "@fontsource/roboto/400.css";
function AdminAuth() {
  
  // User Login info
  const navigate = useNavigate();
 
  const [UnameOrEmail, setUnameOrEmail] = useState("");
  const [password, setpassword] = useState("");

  const user = {
    email: "test@test.com",
    username: "test123",
    password: "123456"
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    if (UnameOrEmail === user.email || UnameOrEmail === user.username) {
      if (password === user.password) {
        navigate("/AdminDash");
      } else {
        navigate("/AdminAuth");
      }
    } else {
      console.log("please check you username or Email");
    }
  };

  

  return (
    <div>
      <div className="p-4 box">
        <h2 className="mb-3">AdminLogin</h2>

        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email address" 
            value={UnameOrEmail}
            onChange={(e) => setUnameOrEmail(e.target.value)}/>
          
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" 
            value={password}
            onChange={(e) => setpassword(e.target.value)}/>
          
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
        If you are a user <Link to="/">Userlogin</Link>
        <br />
        If you are an admin <Link to="/AdminAuth">Admin login</Link>
      </div>
    </div>
  );
}

export default AdminAuth;
