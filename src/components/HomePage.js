// HomePage.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CommonButton from "./CommonButton";

const HomePage = () => {
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
      navigate("/play"); // redirect user to play path
  };

  return (
    <div className="home-page" onKeyUp={handleKeyPress} tabIndex={0}>
      <h1>Welcome To Trivia Game</h1>
      <p>Please Press Start Button to start the game</p>
      <CommonButton className="start-button" onClick={handleKeyPress} label={"Start Game"}></CommonButton>
      <Outlet />
    </div>
  );
};

export default HomePage;

