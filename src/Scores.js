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
    const sortedScores = bestScores;
    sortedScores.sort((a, b) => {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    });
    const rows = [];
    for (let i = 0; i < bestScores.length; i++) {
      rows.push(
        <tr>
          <td>{i + 1}.</td>
          <td>{sortedScores[i].name}</td>
          <td>
            {parseInt(sortedScores[i].score / 1000, 10)},
            {sortedScores[i].score % 1000}s
          </td>
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
        </table>
      </div>
    </div>
  );
};

export default Scores;
