import { useState, useEffect } from "react";
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const db = getDatabase();

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    const questionsRef = ref(db, "questions");
    onValue(questionsRef, (snapshot) => {
      const questionsData = snapshot.val();
      if (questionsData) {
        const questionsArray = Object.entries(questionsData).map(
          ([key, value]) => {
            return {
              key,
              question: value.question,
              options: value.options,
              correctAnswers: value.correctAnswers,
            };
          }
        );
        setQuestions(questionsArray);
      }
    });
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleOptionSelect = (event) => {
    const optionIndex = Number(event.target.value);
    setSelectedOptions([...selectedOptions.slice(0, currentQuestionIndex), optionIndex, ...selectedOptions.slice(currentQuestionIndex + 1)]);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizEnded(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowNextButton(false);
    setSelectedOptions([...selectedOptions.slice(0, currentQuestionIndex + 1), ...selectedOptions.slice(currentQuestionIndex + 2)]);
    setTimeLeft(20);
  };

  const handleEndQuiz = () => {
    const userScoreRef = push(ref(db, "scores"));
    set(userScoreRef, {
      value: score,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding score: ", error);
        alert("Error adding score. Please try again later.");
      });
  };
  

  useEffect(() => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswers.findIndex((answer) => answer)) {
        score++;
      }
    });
    setScore(score);
  }, [selectedOptions]);

  return (
    <div>
      {!quizEnded ? (
        <>
          <div className="Timer">{timeLeft} seconds left</div>
          <div className="Question">{questions[currentQuestionIndex]?.question}</div>
          <div className="Options">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Checkbox color="primary" checked={selectedOptions[currentQuestionIndex] === index} onChange={handleOptionSelect} />}
                label={option} labelPlacement="start" 
              />
            ))}
          </div>
          {showNextButton && (
<button className="NextButton" onClick={handleNextQuestion}>
Next
</button>
)}
</>
) : (
<div className="Score">
<h1>Your score is: {score}</h1>
<button className="EndQuizButton" onClick={handleEndQuiz}>
End Quiz
</button>
</div>
)}
</div>
);
}

export default Quiz;