import React from "react";
import { Link } from "react-router-dom";

function MessageBox(props) {
  return (
    <div>
      <div id="messageBox"></div>
      <div id="newGameBox">
        Let's start a<Link to="/">new game</Link>
      </div>
    </div>
  );
}

export default MessageBox;
