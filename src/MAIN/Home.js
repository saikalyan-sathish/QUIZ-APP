import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const handleCheckout = () => navigate("/quizinstructions");
  
  return (
    <div className="Content">
      <div className="Box2">
        <div className="Card2">
          <div className="Navbar2">
            <div className="Navbar">
              <div className="welcome-statement">
                Hello Welcome <br />
              </div>
            </div>
            <div className="play-button">
              <h1>Welcome to the quiz-app</h1>
              <h1>Click here to play the quiz game</h1>
              <div className="play-button">
                <Button variant="contained" onClick={handleCheckout}>
                  PLAY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;