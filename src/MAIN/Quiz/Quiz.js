import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set,push } from "firebase/database";
import { useNavigate } from "react-router-dom";

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
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(20);
        setSelectedOptions([]);
        setShowNextButton(false);
      } else {
        setQuizEnded(true);
      }
    }
  }, [timeLeft, currentQuestionIndex, questions.length]);
  

const handleOptionChange = (e) => {
const selectedOption = e.target.value;
const question = questions[currentQuestionIndex];
const isOptionSelected = selectedOptions.includes(selectedOption);
if (isOptionSelected) {
    setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
  } else {
    setSelectedOptions([...selectedOptions, selectedOption]);
  }
  
  setShowNextButton(true);
  };
  
  const handleNextButtonClick = () => {
  if (currentQuestionIndex < questions.length - 1) {
  setCurrentQuestionIndex(currentQuestionIndex + 1);
  setTimeLeft(20);
  setSelectedOptions([]);
  setShowNextButton(false);
  } else {
  setQuizEnded(true);
  }
  };
  
  const handleSkipButtonClick = () => {
  if (currentQuestionIndex < questions.length - 1) {
  setCurrentQuestionIndex(currentQuestionIndex + 1);
  setTimeLeft(20);
  setSelectedOptions([]);
  setShowNextButton(false);
  } else {
  setQuizEnded(true);
  }
  };
  
  const handleEndQuizButtonClick = () => {
    // calculate the score
    let score = 0;
    let scores = [];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selectedAnswers = selectedOptions.filter((option) =>
        question.options.includes(option)
      );
      if (selectedAnswers.length === question.correctAnswers.length) {
        const isCorrect = selectedAnswers.every((answer) =>
          question.correctAnswers.includes(answer)
        );
        if (isCorrect) {
          score++;
          scores.push({ question: question.question, correct: true });
        } else {
          scores.push({ question: question.question, correct: false });
        }
      } else {
        scores.push({ question: question.question, correct: false });
      }
    }
    const totalQuestions = questions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentageScore = (score / totalQuestions) * 100;
  
    const scoresRef = ref(db, "scores");
    push(scoresRef, { score, totalQuestions, percentageScore, scores });
  
    navigate({
      pathname: "/Scoreboard",
      state: {
        score,
        totalQuestions,
        percentageScore,
      },
    });
    setQuizEnded(true);
  };
  
return (
    <div>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>Time left: {timeLeft}</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <form>
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </form>
          {showNextButton ? (
            <button onClick={handleNextButtonClick}>Next</button>
          ) : (
            <button disabled>Next</button>
          )}
          <button onClick={handleSkipButtonClick}>Skip</button>
          <button onClick={handleEndQuizButtonClick}>End Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Quiz ended!</h2>
          <p>Your score is {score} out of {questions.length}</p>
          <p>Correct Answers: {score}</p>
          <p>Wrong Answers: {questions.length - score}</p>
          <p>Percentage Score: {(score / questions.length) * 100}%</p>
          <button onClick={() => {
            // store the score in the database
            const dbRef = ref(db, "scores");
            push(dbRef, {
              score: score,
              totalQuestions: questions.length,
              percentageScore: (score / questions.length) * 100,
            }).then(() => {
              // navigate to the scoreboard page
              navigate({
                pathname: "/Scoreboard",
                state: {
                  score: score,
                  totalQuestions: questions.length,
                  percentageScore: (score / questions.length) * 100,
                },
              });
            });
          }}>Go to Scoreboard</button>
        </div>
      )}
    </div>
  );
        } export default Quiz;