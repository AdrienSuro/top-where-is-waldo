import React from "react";
import { useEffect } from "react";
import festival from "./img/festival.png";
import { useState } from "react";
import "./style.css";
import { initializeApp, firebase } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ46kHkX2hNSz5Fu1t_jhGy9iDvHNyuQM",
  authDomain: "festiwaldo.firebaseapp.com",
  projectId: "festiwaldo",
  storageBucket: "festiwaldo.appspot.com",
  messagingSenderId: "180763891346",
  appId: "1:180763891346:web:290893ddabba7851c0f84b",
};

const Game = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const charactersRef = collection(db, "characters");

  useEffect(() => {
    const q = query(collection(db, "characters"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
      });
      console.log("Chracters to be found : ", cities.join(", "));
    });
  }, []);

  let targetingBoxClicked = false;
  let clickX = 0;
  let clickY = 0;
  let rect = "";

  const target = [
    { name: "amerindian", xmin: 1892, xmax: 1943, ymin: 1069, ymax: 1156 },
    { name: "clown", xmin: 2066, xmax: 2156, ymin: 1308, ymax: 1401 },
    { name: "homeless", xmin: 515, xmax: 615, ymin: 1974, ymax: 2065 },
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
    let clickAbsoluteCoord = getPositionRelToImg();
    let result = checkCoord(clickAbsoluteCoord, character);
    console.log(`you're trying to find ${character}`);
    checkMsg(result);
    targetingBox.style.visibility = "hidden";
    targetingBoxClicked = false;
    const messageBox = document.getElementById("messageBox");
    messageBox.style.visibility = "visible";
    setTimeout(() => {
      const messageBox = document.getElementById("messageBox");
      messageBox.style.visibility = "hidden";
    }, 2000);
  }

  function showTargetingBox(x, y, e) {
    const targetingBox = document.getElementById("targetingbox");
    if (targetingBoxClicked === false) {
      rect = e.target.getBoundingClientRect();
      targetingBox.style.top = y - 140 + "px";
      targetingBox.style.left = x + "px";
      targetingBox.style.visibility = "visible";
      targetingBoxClicked = true;
      clickX = x;
      clickY = y;
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
