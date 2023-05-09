import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import festival from "./img/festival.png";
import { useState } from "react";
import "./style.css";
import { q, db } from "./Firebase";
import { onSnapshot } from "firebase/firestore";
import MessageBox from "./MessageBox";
import { doc, setDoc } from "firebase/firestore";

const Game = (props) => {
  const [intervalId, setIntervalId] = useState(null);
  const [target, setTarget] = useState([]);
  let targetingBoxClicked = false;
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [rect, setRect] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [gameComplete, setGameComplete] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const targetingBox = document.getElementById("targetingbox");
  const messageBox = document.getElementById("messageBox");

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTarget(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    const intervalFn = setInterval(props.incrementSeconds, 1000);
    setIntervalId(intervalFn);
    return () => {
      clearInterval(intervalFn);
    };
  }, []);

  useEffect(() => {
    if (gameComplete === true) {
      clearInterval(intervalId);
      setUserScore(props.elapsedSeconds);
      props.resetTimer();
    }
  }, [gameComplete]);

  function checkCoord(coord, character) {
    let result = null;
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
        // Delete this line :
        console.log("already found this one, dude, stop cheating, ");
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
        setGameComplete(true);
        setShowMsg(true);
      } else {
        setCurrentCharacter(character);
        setShowMsg(true);
      }
    } else {
      setShowMsg(true);
      setCurrentCharacter(character);
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
    checkMsg(result);
    if (target.length !== 0) {
      setTimeout(() => {
        setShowMsg(false);
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
      <MessageBox
        userScore={userScore}
        showMsg={showMsg}
        currentCharacter={currentCharacter}
        gameComplete={gameComplete}
      />
    </div>
  );
};

export default Game;
