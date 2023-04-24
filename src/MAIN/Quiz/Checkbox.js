import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate hook
import Button from "@mui/material/Button";
import './Checkbox.css';
import './Quiz';

function Checkbox({ label }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); // initialize useNavigate hook

  const handleSubmit = () => {
    navigate('/Quiz'); // navigate to the /quiz page on submit
  }
 
  return (
    <div className="Checkbox-main">
    <div className="checkbox-wrapper">
      <label>
      <div className="input-checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <span>{label}</span></div>
      </label>
      <div className="Submit-btn">
      <p>
        {isChecked ? (
          <Button variant="contained" onClick={handleSubmit}>START THE QUIZ</Button>
        ) : (
          "Unchecked"
        )}
      </p>
      </div>
    </div>
    </div>
  );
}

export default Checkbox;