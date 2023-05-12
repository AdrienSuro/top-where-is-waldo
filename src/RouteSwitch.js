import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Game from "./Game";
import Start from "./Start";
import Scores from "./Scores";

const RouteSwitch = () => {
  const [startMs, setStartMs] = useState(0);
  const [endMs, setEndMs] = useState(0);
  const [userMs, setUserMs] = useState(0);
  const [countSeconds, setCountSeconds] = useState(0);

  function resetTimer() {
    setUserMs(0);
  }

  return (
    <BrowserRouter>
      <Nav countSeconds={countSeconds} />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route
          path="/game"
          element={
            <Game
              resetTimer={resetTimer}
              setStartMs={setStartMs}
              setEndMs={setEndMs}
              endMs={endMs}
              startMs={startMs}
              userMs={userMs}
              setUserMs={setUserMs}
              countSeconds={countSeconds}
              setCountSeconds={setCountSeconds}
            />
          }
        ></Route>
        <Route path="/scores" element={<Scores />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
