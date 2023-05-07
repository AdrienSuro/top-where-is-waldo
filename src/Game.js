import React from "react";
import { useEffect } from "react";
import festival from "./img/festival.png";
import { useState } from "react";
import "./style.css";
import q from "./Firebase";
import { onSnapshot } from "firebase/firestore";

const Game = (props) => {
  const [target, setTarget] = useState([]);
  const [time, setTime] = useState(new Date());
  let targetingBoxClicked = false;
  let clickX = 0;
  let clickY = 0;
  let rect = "";

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTarget(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    const intervalFn = setInterval(props.incrementSeconds, 1000);
    return () => {
      clearInterval(intervalFn);
    };
  }, []);

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
    const messageBox = document.getElementById("messageBox");
    if (character) {
      const characterTarget = document.getElementById(character + "Checkbox");
      characterTarget.innerHTML = "&#10003;";
      characterTarget.style.fontSize = "2.2rem";
      messageBox.innerHTML = `Congratulations ! You found ${character} `;
    } else {
      console.log("Missed ! Try again");
      messageBox.innerHTML = "You missed the target, try again!";
    }
  }

  function getPositionRelToImg() {
    let absoluteX = clickX * (2248 / rect.width);
    let absoluteY = (clickY - 140) * (2248 / rect.width);
    let clickAbsoluteCoord = [absoluteX, absoluteY];
    return clickAbsoluteCoord;
  }

  function clickOnCharacter(character) {
    const targetingBox = document.getElementById("targetingbox");
    const messageBox = document.getElementById("messageBox");
    let clickAbsoluteCoord = getPositionRelToImg();
    let result = checkCoord(clickAbsoluteCoord, character);
    checkMsg(result);
    targetingBox.style.visibility = "hidden";
    targetingBoxClicked = false;
    messageBox.style.visibility = "visible";
    setTimeout(() => {
      messageBox.style.visibility = "hidden";
    }, 2000);
  }

  function updateClickCoord(x, y) {
    clickX = x;
    clickY = y;
  }

  function showTargetingBox(x, y, e) {
    const targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      rect = e.target.getBoundingClientRect();
      targetingBox.style.top = y - 140 + "px";
      targetingBox.style.left = x + "px";
      targetingBox.style.visibility = "visible";
      targetingBoxClicked = true;
      updateClickCoord(x, y);
      console.log(target);
    } else if (targetingBoxClicked === true) {
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
        <h3 id="amerindianBox" onClick={() => clickOnCharacter("amerindian")}>
          AMERINDIAN
        </h3>
        <h3 id="clownBox" onClick={() => clickOnCharacter("clown")}>
          CLOWN
        </h3>
        <h3 id="homeless" onClick={() => clickOnCharacter("homeless")}>
          HOMELESS
        </h3>
      </div>
      <div id="messageBox">
        <p>Congratulations you found</p>
      </div>
    </div>
  );
};

export default Game;
