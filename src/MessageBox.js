import React from "react";
import { Link } from "react-router-dom";
import { q, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

function MessageBox(props) {
  function addScoreToFirebase(name) {
    if (name !== null) {
      setDoc(doc(db, "scores", name), {
        score: props.elapsedSeconds,
      });
    }
  }

  return (
    <div>
      {props.showMsg === true && (
        <>
          {" "}
          {props.gameComplete ? (
            <>
              <div id="messageBox">
                <div>Well done ! You found all the characters !</div>
                <div>
                  You can add your time to the best scores or start a new game
                </div>
                <div>Your time : {props.elapsedSeconds} </div>
                <div>
                  <h2>Enter your name</h2>
                  <input type="text" id="userNameInput"></input>
                  <button
                    onClick={() => {
                      const userNameInput =
                        document.getElementById("userNameInput");
                      addScoreToFirebase(userNameInput.value);
                    }}
                  >
                    Submit score
                  </button>
                </div>
                <Link to="/">
                  <h2>New Game</h2>
                </Link>
              </div>
            </>
          ) : (
            <>
              {props.currentCharacter === null && (
                <div id="messageBox">You missed the target, try again!</div>
              )}
              {props.currentCharacter !== null && (
                <div id="messageBox">
                  <div>
                    Congratulations, you found {props.currentCharacter} !
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MessageBox;
