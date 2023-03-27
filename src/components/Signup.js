import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container p-4">
      <div className="card">
        <h2 className="card-header">QUIZ APP Signup</h2>
        <div className="card-body">
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
              style={{ marginTop: "1rem" }}
            >
              Sign up
            </Button>
          </form>
        </div>
        <div className="card-footer text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
