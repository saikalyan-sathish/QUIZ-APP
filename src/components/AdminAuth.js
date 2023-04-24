import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import "@fontsource/roboto/400.css";
import "./Admin/AdminAuth.css";

function AdminAuth({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [UnameOrEmail, setUnameOrEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const adminEmail = "admin@test.com";
  const adminPassword = "password";

  const handlesubmit = (e) => {
    e.preventDefault();

    if (UnameOrEmail === adminEmail) {
      if (password === adminPassword) {
        setIsAuthenticated(true);
        navigate("/AdminDash");
      } else {
        setError("Invalid password. Please try again.");
      }
    } else {
      setError("Invalid email. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-heading">
          <h2>Admin Login</h2>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={UnameOrEmail}
              onChange={(e) => setUnameOrEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              variant="contained"
              type="submit"
              className="login-button"
            >
              Log In
            </Button>
          </div>
        </Form>

        <div className="signup-link-container">
          Don't have an account?{" "}
          <div className="signup-link">
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </div>
        </div>

        <div className="admin-link-container">
          If you are a user{" "}
          <div className="admin-link">
            <Link to="/" className="admin-link">
              User login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;