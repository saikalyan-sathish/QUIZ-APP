import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./Scoreboard.css";
const db = getDatabase();

function Scoreboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = ref(db, "scores");
    onValue(scoresRef, (snapshot) => {
      const scoresData = snapshot.val();
      if (scoresData) {
        const scoresArray = Object.entries(scoresData).map(([key, value]) => {
          return {
            key,
            score: value.score,
            totalQuestions: value.totalQuestions,
            scores: value.scores,
          };
        });
        setScores(scoresArray);
      }
    });
  }, []);

  return (
    <div>
      <h2>Scoreboard</h2>
      {scores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.key}>
                <td>{score.score}</td>
                <td>{score.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores yet.</p>
      )}
    </div>
  );
}

export default Scoreboard;
