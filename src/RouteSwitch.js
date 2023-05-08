import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Game from "./Game";
import Start from "./Start";
import Scores from "./Scores";

const RouteSwitch = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  function incrementSeconds() {
    setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
  }

  return (
    <BrowserRouter>
      <Nav elapsedSeconds={elapsedSeconds} />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route
          path="/game"
          element={
            <Game
              incrementSeconds={incrementSeconds}
              elapsedSeconds={elapsedSeconds}
            />
          }
        ></Route>
        <Route path="/scores" element={<Scores />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
