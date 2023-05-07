import React from "react";
import { Link } from "react-router-dom";
import festival from "./img/festival.png";
import "./style.css";

const Start = () => {
  return (
    <div style={{ position: "relative" }}>
      <img className="festivalImgDimmed" src={festival}></img>
      <div className="welcomeDiv">
        <h1>Welcome to FESTIWALDO !</h1>
        <p>
          3 characters are trying to hide themselves inside this dancing and
          celebrating crowd of people
        </p>
        <p>Your mission is to find them !</p>
        <p>
          Once you found one of them, click on it an select the character's name
        </p>
        <p>Try to be quick ;-)</p>
        <Link to="/game">
          <h2 onClick={() => console.log("hi")}>START</h2>
        </Link>
      </div>
    </div>
  );
};

export default Start;
