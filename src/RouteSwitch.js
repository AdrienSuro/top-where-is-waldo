import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Game from "./Game";
import Start from "./Start";
import Scores from "./Scores";

const RouteSwitch = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startMs, setStartMs] = useState(0);
  const [endMs, setEndMs] = useState(0);
  const [userMs, setUserMs] = useState(0);

  function incrementSeconds() {
    setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
  }

  function resetTimer() {
    setElapsedSeconds(0);
  }

  return (
    <BrowserRouter>
      <Nav elapsedSeconds={elapsedSeconds} startMs={startMs} endMs={endMs} />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route
          path="/game"
          element={
            <Game
              incrementSeconds={incrementSeconds}
              elapsedSeconds={elapsedSeconds}
              setElapsedSeconds={setElapsedSeconds}
              resetTimer={resetTimer}
              setStartMs={setStartMs}
              setEndMs={setEndMs}
              endMs={endMs}
              startMs={startMs}
              userMs={userMs}
              setUserMs={setUserMs}
            />
          }
        ></Route>
        <Route path="/scores" element={<Scores />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
