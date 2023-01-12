import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import './Checkbox.css';

function Checkbox({ label }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <span>{label}</span>
      </label>
      <p>
        {isChecked ? (
          <Button variant="contained">START THE QUIZ</Button>
        ) : (
          "Unchecked"
        )}
      </p>
    </div>
  );
}

export default Checkbox;
