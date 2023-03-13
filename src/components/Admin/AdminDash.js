import React, { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set ,push, child} from "firebase/database";

function AdminPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [key, setKey] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    let updatedOptions = [...options];
    updatedOptions[e.target.id] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    let updatedCorrectAnswers = [...correctAnswers];
    if (e.target.checked) {
      updatedCorrectAnswers.push(e.target.value);
    } else {
      updatedCorrectAnswers = updatedCorrectAnswers.filter(
        (item) => item !== e.target.value
      );
    }
    setCorrectAnswers(updatedCorrectAnswers);
  };
const db = getDatabase();
  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    let newKey = db.ref().child("questions").push().key;
    // let newKey = set(ref(db),child("questions"),push().key);
    setKey(newKey);
   set(ref(db,"questions/"+newKey),{
      question: question,
      options: options,
      correctAnswers: correctAnswers,
    });
    setQuestion("");
    setOptions([]);
    setCorrectAnswers([]);
  };
  // db.ref("questions/" + newKey).

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <input type="text" value={question} onChange={handleQuestionChange} />
        <br />
        <br />
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              id={index}
              value={option}
              onChange={handleOptionChange}
            />
            <input
              type="checkbox"
              value={option}
              onChange={handleCorrectAnswerChange}
            />
            Correct
          </div>
        ))}
        <br />
        <button type="button" onClick={() => setOptions([...options, ""])}>
          Add Option
        </button>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminPage;
