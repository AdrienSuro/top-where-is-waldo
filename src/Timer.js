import React from "react";
import { useState, useEffect } from "react";

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (props.countSeconds >= 60) {
      setSeconds(props.countSeconds % 60);
      setMinutes(parseInt(props.countSeconds / 60, 10));
    } else if (props.countSeconds < 60) {
      setSeconds(props.countSeconds);
      setMinutes(0);
    }
  }, [props.countSeconds]);

  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
