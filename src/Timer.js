import React from "react";
import { useState, useEffect } from "react";

function Timer(props) {
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (props.elapsedSeconds >= 3600) {
      setMs(props.elapsedSeconds % 60);
      setSeconds(parseInt((props.elapsedSeconds % 3600) / 60, 10));
      setMinutes(parseInt(props.elapsedSeconds / 60 / 60, 10));
    } else if (props.elapsedSeconds >= 60) {
      setMs(props.elapsedSeconds % 60);
      setSeconds(parseInt(props.elapsedSeconds / 60, 10));
      setMinutes(parseInt(props.elapsedSeconds / 60 / 60, 10));
    } else if (props.elapsedSeconds < 60) {
      setMs(props.elapsedSeconds);
      setSeconds(0);
      setMinutes(0);
    }
  }, [props.elapsedSeconds]);

  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds} : {ms}
    </div>
  );
}

export default Timer;
