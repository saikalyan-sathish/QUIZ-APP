import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '@fontsource/roboto/400.css';
import "./Admin.css";

function AdminDash() {
  return (
    <div>
      <div className="Heading">
      <h2>Please enter the questions to be displayed in the Quiz</h2></div>
   <div className="form">
        
          <TextField
            id="name-input"
            name="name"
            label="Enter the question"
            type="text"
          
          />
        
        <li></li>
        
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"/>
           
           </div>
          
    </div>
  );
}

export default AdminDash;
