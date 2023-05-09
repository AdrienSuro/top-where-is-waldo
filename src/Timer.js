import React from "react";
import { useState, useEffect } from "react";

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (props.elapsedSeconds >= 60) {
      setSeconds(props.elapsedSeconds % 60);
      setMinutes(parseInt(props.elapsedSeconds / 60, 10));
    } else if (props.elapsedSeconds < 60) {
      setSeconds(props.elapsedSeconds);
      setMinutes(0);
    }
  }, [props.elapsedSeconds]);

  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
