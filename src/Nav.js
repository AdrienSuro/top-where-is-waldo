import React from "react";
import "./normalize.css";
import "./style.css";
import first from "./img/1_104_104.png";
import second from "./img/2_104_104.png";
import third from "./img/3_104_104.png";

const Nav = () => {
  return (
    <div className="header">
      <h2 className="newGame">NEW GAME</h2>
      <h2 className="bestScores">BEST SCORES</h2>
      <h1>FESTIWALDO</h1>
      <div className="charactersDiv">
        <h2>FIND THESE 3 CHARACTERS</h2>
        <img src={first}></img>
        <img src={second}></img>
        <img src={third}></img>
        <h3></h3>
        <h3></h3>
        <h3></h3>
      </div>
    </div>
  );
};

export default Nav;
