import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Game from "./Game";
import Start from "./Start";
import Scores from "./Scores";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/scores" element={<Scores />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
