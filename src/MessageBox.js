import React from "react";
import { Link } from "react-router-dom";

function MessageBox(props) {
  return (
    <div>
      {props.showMsg === true && (
        <>
          {" "}
          {props.gameComplete ? (
            <>
              <div id="messageBox">
                Well done ! You found all the characters in{" "}
                {props.elapsedSeconds} seconds ! You can add your score to the
                best scores here or let's start a <Link to="/">new game</Link>
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
