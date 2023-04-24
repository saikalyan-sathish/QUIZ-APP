import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import './Login.css'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    const auth = getAuth();
    event.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="Login-heading"><h2 className="login-heading">QUIZ APP Signup</h2></div>
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

          <div className="d-grid gap-2">
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
          </div>
        </form>

        <div className="signup-link-container">
          Already have an account? <div className="signup-link"><Link to="/" className="signup-link">Log In</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;