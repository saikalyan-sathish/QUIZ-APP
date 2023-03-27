import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import GoogleButton from "react-google-button";
import '@fontsource/roboto/400.css';
import './Login.css'
import { auth,signInWithEmailAndPassword } from '../Firebase';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      // await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">QUIZ APP LOGIN</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{width: '100%', marginBottom: '1rem'}}
          />

          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{width: '100%', marginBottom: '1rem'}}
          />

          <div className="d-grid gap-2">
            <Button variant="contained" type="Submit" className="login-button">
              Log In
            </Button>
          </div>
        </Form>

        <div className="google-login-container">
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>

        <div className="signup-link-container">
          Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </div>

        <div className="admin-link-container">
          If you are an admin <Link to="/AdminAuth" className="admin-link">Admin login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
