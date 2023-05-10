import React from "react";
import festival from "./img/festival.png";
import "./style.css";
import { scoresFirebase } from "./Firebase";
import { onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Scores = () => {
  const [bestScores, setBestScores] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getBestScores = onSnapshot(scoresFirebase, (querySnapshot) => {
      setBestScores(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    const rows = [];
    for (let i = 0; i < bestScores.length; i++) {
      rows.push(
        <tr>
          <td>{i + 1}</td>
          <td>{bestScores[i].name}</td>
          <td>{bestScores[i].score}</td>
        </tr>
      );
    }
    setRows(rows);
    console.log(bestScores);
  }, [bestScores]);

  return (
    <div style={{ position: "relative" }}>
      <img className="festivalImgDimmed" id="dimmedAgain" src={festival}></img>
      <div id="scoreBox">
        <table id="scoreTable">
          <tr>
            <th>Position</th>
            <th>Name </th>
            <th>Score</th>
          </tr>
          {rows.map((element) => element)}
          <tr>
            <td>1.</td>
            <td>Louise</td>
            <td>7:30</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Scores;
