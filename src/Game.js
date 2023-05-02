import React from "react";
import festival from "./img/festival.png";
import "./style.css";

const Game = () => {
  let targetingBoxClicked = false;

  function checkCoordinates(x, y) {
    console.log(`checking coordinates : x is ${x} and y is ${y}  `);
    if (x) return;
  }

  function getPositionRelToImg(x, y, e) {
    let rect = e.target.getBoundingClientRect();
    console.log(rect);
    let absoluteX = x * (2248 / rect.width);
    console.log(absoluteX);
    let absoluteY = (y - 140) * (2248 / rect.width);
    let clickAbsoluteCoord = [absoluteX, absoluteY];
    return clickAbsoluteCoord;
  }

  function showTargetingBox(x, y, e) {
    let targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      console.log(getPositionRelToImg(x, y, e));
      //   let clickCoordinates = checkCoordinates(x, y - 140);
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
