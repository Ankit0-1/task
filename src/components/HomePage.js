// HomePage.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
      navigate("/play"); // redirect user to play path
  };

  return (
    <div className="home-page" onKeyUp={handleKeyPress} tabIndex={0}>
      <h1>Welcome To Trivia Game</h1>
      <p>Press Any key or Button to start the game</p>
      <button className="start-button" onClick={handleKeyPress}>Start Game</button>
      <Outlet />
    </div>
  );
};

export default HomePage;

