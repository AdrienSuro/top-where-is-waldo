import React from "react";
import { Link } from "react-router-dom";
import "./normalize.css";
import "./style.css";
import first from "./img/1_104_104.png";
import second from "./img/2_104_104.png";
import third from "./img/3_104_104.png";
import Character from "./Character";
import Timer from "./Timer";

const Nav = (props) => {
  return (
    <div className="header">
      <Link className="newGame" to="/">
        <h2>NEW GAME</h2>
      </Link>
      <Link className="bestScores" to="/Scores">
        <h2>BEST SCORES</h2>
      </Link>
      <Link className="title" to="/">
        <h1>FESTIWALDO</h1>
      </Link>
      <Timer
        elapsedSeconds={props.elapsedSeconds}
        userMS={props.usermS}
        getSeconds={props.getSeconds}
        startMs={props.startMs}
        endMs={props.endMs}
        countSeconds={props.countSeconds}
        setCountSeconds={props.setCountSeconds}
      />
      <div className="charactersDiv">
        <h2>FIND THESE :</h2>
        <Character image={first} name="amerindian" />
        <Character image={second} name="clown" />
        <Character image={third} name="homeless" />
      </div>
    </div>
  );
};

export default Nav;
