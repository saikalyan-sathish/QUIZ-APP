import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import GoogleButton from "react-google-button";
import '@fontsource/roboto/400.css';
import './Login.css'
import { auth as firebaseAuth, signInWithEmailAndPassword } from '../firebase';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const auth = getAuth();

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      const scoresRef = ref(db, "scores");
      onValue(scoresRef, (snapshot) => {
        const scoresData = snapshot.val();
        if (scoresData) {
          const scoresArray = Object.entries(scoresData).map(([key, value]) => ({
            key,
            ...value,
          }));
          const userScores = scoresArray.filter((score) => score.userId === userId);
          if (userScores.length > 0) {
            const latestScore = userScores.reduce((acc, curr) => {
              return new Date(curr.date) > new Date(acc.date) ? curr : acc;
            });
            const { score, totalQuestions, percentageScore } = latestScore;
            axios.put(`/users/${userId}.json`, { score, totalQuestions, percentageScore });
          }
        }
      });
    }
  }, [userId]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="Login-heading"><h2 className="login-heading">QUIZ APP LOGIN</h2></div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="input-email"><TextField
            variant="outlined"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{width: '100%', marginBottom: '1rem'}}
          /></div>

        <div className="input-password"> <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{width: '100%', marginBottom: '1rem'}}
          /> </div> 

          <div className="d-grid gap-2">
            <Button variant="contained" type="submit" className="login-button">
              Log In
            </Button>
          </div>
        </Form>
        <div className="google-login

">
<GoogleButton
onClick={() => {
const provider = new firebaseAuth.GoogleAuthProvider();
firebaseAuth.signInWithPopup(provider).then((result) => {
setIsAuthenticated(true);
navigate("/home");
}).catch((error) => {
setError("Something went wrong. Please try again.");
});
}}
/>
</div>
</div>
</div>
);
}

export default Login;