import React from "react";
import first from "./img/1_104_104.png";

function Character(props) {
  return (
    <div className="characterBox">
      <img src={props.image}></img>
      <h3 id={props.name + "Checkbox"}>?</h3>
    </div>
  );
}

export default Character;
