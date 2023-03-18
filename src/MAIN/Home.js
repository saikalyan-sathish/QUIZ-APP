import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
// import { useUserAuth } from "../context/UserAuthContext";
import "./Home.css";
// import {Link} from 'react-router-dom';
// import quizinstructions from "./Quiz/quizinstructions";

const Home = () => {
  // const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCheckout = () => navigate("/quizinstructions");
  return (
    <>
      <div className="Navbar">
        <div className="Logout-btn">
          <Button variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        </div>

        <div className="welcome-statement">
          Hello Welcome <br />
          {/* {user && user.email} */}
        </div>
      </div>
      <div className="play-button">
        <h1>Welcome to the quiz-app</h1>
        <h1>Click here to play the quiz game</h1>
        <div className="play-button1">
          <Button variant="contained" onClick={handleCheckout}>
            PLAY
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
