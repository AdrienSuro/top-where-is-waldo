import React from "react";
import { Link } from "react-router-dom";
import { q, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

function MessageBox(props) {
  function addScoreToFirebase() {
    setDoc(doc(db, "scores", "Test-2"), {
      score: 13,
    });
  }

  return (
    <div>
      {props.showMsg === true && (
        <>
          {" "}
          {props.gameComplete ? (
            <>
              <div id="messageBox">
                <div>
                  Well done ! You found all the characters in{" "}
                  {props.elapsedSeconds} seconds ! You can add your score to the
                  best scores here or let's start a new game
                </div>
                <div>
                  <h2>Enter your name</h2>
                  <input type="text"></input>
                  <button onClick={addScoreToFirebase}>Submit score</button>
                </div>
                <Link to="/">
                  <h2>New Game</h2>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div id="messageBox">
                <div>Congratulations, you found {props.currentCharacter} !</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MessageBox;
