// ResultPage.js
import React, { useContext } from "react";
import { myContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { right, wrong, count, dispatch, resetAll } = useContext(myContext);
  const navigate = useNavigate();

  const totalQuestions = count;
  const correctAnswers = right;
  const wrongAnswers = wrong;
  const percentage = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const handleRestartGame = () => {
    resetAll()
    navigate('/play');
  }
  return (
    <div className="result-container">
      <h2>Result Page</h2>
      <div className="result-stats">
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Wrong Answers: {wrongAnswers}</p>
        <p>Percentage: {percentage}%</p>
      </div>
      <button className="restart-button" onClick={() => handleRestartGame()}>
        Resart Game
      </button>
    </div>
  );
};

export default ResultPage;
