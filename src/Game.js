import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import festival from "./img/festival.png";
import { useState } from "react";
import "./style.css";
import q from "./Firebase";
import { onSnapshot } from "firebase/firestore";
import MessageBox from "./MessageBox";

const Game = (props) => {
  const [target, setTarget] = useState([]);
  let targetingBoxClicked = false;
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [rect, setRect] = useState("");
  const [foundChar, setFoundChar] = useState([]);
  const [winner, setWinner] = useState(false);
  const targetingBox = document.getElementById("targetingbox");
  const messageBox = document.getElementById("messageBox");

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTarget(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  //Will create a simple array of target at the beginning
  // useEffect(() => {})

  useEffect(() => {
    const intervalFn = setInterval(props.incrementSeconds, 1000);
    return () => {
      clearInterval(intervalFn);
    };
  }, []);

  useEffect(() => {
    if (foundChar.length === 3) {
      displayMsg("complete");
      console.log("it has length 3 youhou");
      setWinner(true);
    } else {
      return;
    }
  }, [foundChar]);

  function displayMsg(completeness) {
    const messageBox = document.getElementById("messageBox");
    if (completeness) {
      messageBox.innerHTML = "Congrats ! You found all 3 characters";
    }
  }

  function checkCoord(coord, character) {
    let result = "";
    let characterIndex = target.findIndex((element) => {
      return element.name === character;
    });
    if (
      characterIndex != -1 &&
      coord[0] >= target[characterIndex].xmin &&
      coord[0] <= target[characterIndex].xmax &&
      coord[1] >= target[characterIndex].ymin &&
      coord[1] <= target[characterIndex].ymax
    ) {
      result = target[characterIndex].name;
    }
    return result;
  }

  function updateArray(character) {
    if (character) {
      let characterIndex = target.findIndex((element) => {
        return element.name === character;
      });
      if (characterIndex != null) {
        let newTargetArray = target;
        newTargetArray.splice(characterIndex, 1);
        setTarget(newTargetArray);
      } else {
        console.log("already found this one, dude, stop cheating");
      }
    }
  }

  function checkCharacterBox(character) {
    if (character) {
      const characterTarget = document.getElementById(character + "Checkbox");
      characterTarget.innerHTML = "&#10003;";
      characterTarget.style.fontSize = "2.2rem";
    }
  }

  function checkMsg(character) {
    if (character) {
      if (target.length == 0) {
        return `YOU FOUND THEM 3 !!! In ${props.elapsedSeconds} seconds !`;
      } else {
        return `Congratulations ! You found ${character} `;
      }
    } else {
      return "You missed the target, try again!";
    }
  }

  function getPositionRelToImg() {
    let absoluteX = clickX * (2248 / rect.width);
    let absoluteY = (clickY - 140) * (2248 / rect.width);
    let clickAbsoluteCoord = [absoluteX, absoluteY];
    return clickAbsoluteCoord;
  }

  function hideTargetingBox() {
    targetingBox.style.visibility = "hidden";
    targetingBoxClicked = false;
  }

  function clickOnCharacter(character) {
    hideTargetingBox();
    let clickAbsoluteCoord = getPositionRelToImg();
    let result = checkCoord(clickAbsoluteCoord, character);
    updateArray(result);
    checkCharacterBox(result);
    messageBox.innerHTML = checkMsg(result);
    messageBox.style.visibility = "visible";
    if (target.length !== 0) {
      setTimeout(() => {
        messageBox.style.visibility = "hidden";
      }, 2000);
    }
  }

  function updateClickCoord(x, y) {
    setClickX(x);
    setClickY(y);
  }

  function showTargetingBox(x, y, e) {
    const targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      setRect(e.target.getBoundingClientRect());
      targetingBox.style.top = y - 140 + "px";
      targetingBox.style.left = x + "px";
      targetingBox.style.visibility = "visible";
      targetingBoxClicked = true;
      updateClickCoord(x, y);
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
      <MessageBox elapsedSeconds={props.elapsedSeconds} />
    </div>
  );
};

export default Game;
