import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { Link } from "react-router-dom";
import './AdminDash.css'

const db = getDatabase();

function AdminPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([false, false, false, false]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const questionsRef = ref(db, "questions");
    const newQuestionRef = push(questionsRef);
    set(newQuestionRef, {
      question,
      options,
      correctAnswers,
    })
      .then(() => {
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswers([false, false, false, false]);
        alert("Question added successfully!");
      })
      .catch((error) => {
        console.error("Error adding question: ", error);
        alert("Error adding question. Please try again later.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Question:
            <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Option 1:
            <input type="text" value={options[0]} onChange={(event) => setOptions([...options.slice(0, 0), event.target.value, ...options.slice(1)])} />
          </label>
        </div>
        <div>
          <label>
            Option 2:
            <input type="text" value={options[1]} onChange={(event) => setOptions([...options.slice(0, 1), event.target.value, ...options.slice(2)])} />
          </label>
        </div>
        <div>
          <label>
            Option 3:
            <input type="text" value={options[2]} onChange={(event) => setOptions([...options.slice(0, 2), event.target.value, ...options.slice(3)])} />
          </label>
        </div>
        <div>
          <label>
            Option 4:
            <input type="text" value={options[3]} onChange={(event) => setOptions([...options.slice(0, 3), event.target.value])} />
          </label>
        </div>
        <div>
          <label>
            <div className="Correctanswers-checkbox">
            Correct Answers:
            <input type="checkbox" checked={correctAnswers[0]} onChange={(event) => setCorrectAnswers([event.target.checked, ...correctAnswers.slice(1)])} />
            <input type="checkbox" checked={correctAnswers[1]} onChange={(event) => setCorrectAnswers([correctAnswers[0], event.target.checked, ...correctAnswers.slice(2)])} />
            <input type="checkbox" checked={correctAnswers[2]} onChange={(event) => setCorrectAnswers([...correctAnswers.slice(0, 2), event.target.checked, correctAnswers[3]])} />
            <input type="checkbox" checked={correctAnswers[3]} onChange={(event) => setCorrectAnswers([...correctAnswers.slice(0, 3), event.target.checked])} /> </div>
          </label>
        </div>
        <div className="Addquestion-btn">
        <button type="submit">Add Question</button></div>
      </form>
      <div>
        <Link to="/AdminDelete">If you want to delete a question, click here.</Link>
      </div>
</div>
  );
}

export default AdminPage;