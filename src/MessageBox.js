import React from "react";
import { Link } from "react-router-dom";
import { q, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function MessageBox(props) {
  function addScoreToFirebase(name) {
    if (name !== null) {
      setDoc(doc(db, "scores", uuidv4()), {
        score: props.userScore,
        name: name,
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
                <div>Your time : {props.userScore} </div>
                <div>
                  <h2>Enter your name</h2>
                  <input type="text" id="userNameInput"></input>
                  <button
                    onClick={() => {
                      const userNameInput =
                        document.getElementById("userNameInput");
                      addScoreToFirebase(userNameInput.value);
                      userNameInput.value = "";
                    }}
                  >
                    Submit score
                  </button>
                </div>
                <Link to="/scores">
                  <h2>See best scores</h2>
                </Link>
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
