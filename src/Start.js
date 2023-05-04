import React from "react";
import festival from "./img/festival.png";
import "./style.css";

const Start = () => {
  return (
    <div style={{ position: "relative" }}>
      <img className="festivalImgDimmed" src={festival}></img>
    </div>
  );
};

export default Start;
