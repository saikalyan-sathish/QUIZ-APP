import { useState, useEffect } from "react";
import { getDatabase, ref, child, remove, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import "./AdminDelete.css";

const db = getDatabase();

function AdminDelete() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsRef = ref(db, "questions");
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      const questionList = data ? Object.entries(data) : [];
      setQuestions(questionList);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = (questionId) => {
    const questionRef = child(ref(db), `questions/${questionId}`);
    remove(questionRef)
      .then(() => {
        alert("Question deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting question: ", error);
        alert("Error deleting question. Please try again later.");
      });
  };

  return (
    <div className="admin-delete-container">
      <h2 className="admin-delete-title">Questions List</h2>
      <div className="admin-delete-scroll">
        {questions.map(([questionId, question], index) => (
          <div key={questionId} className="admin-delete-question">
            <h3 className="admin-delete-question-title">{`Question ${index + 1}: ${question.question}`}</h3>
            <ul className="admin-delete-question-options">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
            <button onClick={() => handleDelete(questionId)} className="admin-delete-button">Delete Question</button>
          </div>
        ))}
      </div>
      <div>
        <Link to="/AdminDash" className="admin-delete-link">Go back to Add Question page</Link>
      </div>
    </div>
  );
}
export default AdminDelete;