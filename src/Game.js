import React from "react";
import festival from "./img/festival.png";
import "./style.css";

const Game = () => {
  let targetingBoxClicked = false;

  function checkCoordinates(coord) {
    console.log(
      `checking coordinates : x is ${coord[0]} and y is ${coord[1]}  `
    );
  }

  function getPositionRelToImg(x, y, e) {
    let rect = e.target.getBoundingClientRect();
    let absoluteX = x * (2248 / rect.width);
    let absoluteY = (y - 140) * (2248 / rect.width);
    let clickAbsoluteCoord = [absoluteX, absoluteY];
    return clickAbsoluteCoord;
  }

  function showTargetingBox(x, y, e) {
    let targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      let clickAbsoluteCoord = getPositionRelToImg(x, y, e);
      checkCoordinates(clickAbsoluteCoord);
      targetingBox.style.top = y - 140 + "px";
      targetingBox.style.left = x + "px";
      targetingBox.style.visibility = "visible";
      targetingBoxClicked = true;
    } else if (targetingBoxClicked === true) {
      let targetingBox = document.getElementById("targetingbox");
      targetingBox.style.visibility = "hidden";
      targetingBoxClicked = false;
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <img
        className="festivalImg"
        src={festival}
        onClick={(e) => showTargetingBox(e.pageX, e.pageY, e)}
      ></img>
      <div id="targetingbox">
        <h3>AMERINDIAN</h3>
        <h3>CLOWN</h3>
        <h3>HOMELESS</h3>
      </div>
    </div>
  );
};

export default Game;
