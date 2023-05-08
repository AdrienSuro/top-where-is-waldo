import React from "react";
import { Link } from "react-router-dom";

function MessageBox(props) {
  return (
    <div>
      {props.showMsg === true && (
        <>
          <div id="messageBox">
            <div>Congratulations, you found {props.currentCharacter}</div>
            {props.gameComplete && (
              <>
                <div id="newGameBox">
                  Let's start a<Link to="/">new game</Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MessageBox;
