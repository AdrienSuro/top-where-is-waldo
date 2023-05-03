import React from "react";
import festival from "./img/festival.png";
import "./style.css";

const Game = () => {
  let targetingBoxClicked = false;
  let clickX = 0;
  let clickY = 0;
  let rect = "";

  const target = [
    { name: "Amerindian", xmin: 1892, xmax: 1943, ymin: 1069, ymax: 1156 },
    { name: "Clown", xmin: 2066, xmax: 2156, ymin: 1308, ymax: 1401 },
    { name: "Homeless", xmin: 515, xmax: 615, ymin: 1974, ymax: 2065 },
  ];

  function checkCoord(coord, character) {
    let result = "";
    let characterIndex = target.findIndex((element) => {
      return element.name === character;
    });
    if (
      coord[0] >= target[characterIndex].xmin &&
      coord[0] <= target[characterIndex].xmax &&
      coord[1] >= target[characterIndex].ymin &&
      coord[1] <= target[characterIndex].ymax
    ) {
      result = target[characterIndex].name;
    }
    return result;
  }

  function checkMsg(character) {
    if (character) {
      console.log(`Congratulations ! You found ${character} `);
    } else {
      console.log("Missed ! Try again");
    }
  }

  function getPositionRelToImg() {
    let absoluteX = clickX * (2248 / rect.width);
    let absoluteY = (clickY - 140) * (2248 / rect.width);
    let clickAbsoluteCoord = [absoluteX, absoluteY];
    return clickAbsoluteCoord;
  }

  function clickOnCharacter(character) {
    let clickAbsoluteCoord = getPositionRelToImg();
    let result = checkCoord(clickAbsoluteCoord, character);
    console.log(`you're trying to find ${character}`);
    checkMsg(result);
    return character;
  }

  function showTargetingBox(x, y, e) {
    let targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      rect = e.target.getBoundingClientRect();
      targetingBox.style.top = y - 140 + "px";
      targetingBox.style.left = x + "px";
      targetingBox.style.visibility = "visible";
      targetingBoxClicked = true;
      clickX = x;
      clickY = y;
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
        <h3 id="amerindianBox" onClick={() => clickOnCharacter("Amerindian")}>
          AMERINDIAN
        </h3>
        <h3 id="clownBox" onClick={() => clickOnCharacter("Clown")}>
          CLOWN
        </h3>
        <h3 id="homeless" onClick={() => clickOnCharacter("Homeless")}>
          HOMELESS
        </h3>
      </div>
    </div>
  );
};

export default Game;
