"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import openingsJson from "../eco.json";
import styles from "./page.module.css";

interface opening {
  name: string;
  moves: string;
}

const INITIAL_INDEX = -1;

export default function Home() {
  const [index, setIndex] = useState(INITIAL_INDEX);
  const [depth, setDepth] = useState('1');

  function newOpening() {
    setIndex(getRandomInt(openingsJson.length));
  }
  
  function getRandomInt(max: number) {
    var newRandom = Math.floor(Math.random() * max);
    while (newRandom == index || !openingsJson[newRandom].moves.includes(`${Number(depth)}.`) || openingsJson[newRandom].moves.includes(`${Number(depth) + 1}.`)) {
      newRandom = Math.floor(Math.random() * max);
    }
    return newRandom;
  }

  function renderOpeningName() {
    if (index == INITIAL_INDEX) {
      return "";
    }
    return openingsJson[index].name;
  }

  function renderOpeningMoves() {
    if (index == INITIAL_INDEX) {
      return "";
    }
    return openingsJson[index].moves;
  }

  function renderOpeningFEN() {
    if (index == INITIAL_INDEX) {
      return "start";
    }
    return openingsJson[index].fen;
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p>Opening Randomizer</p>
      </div>
      <div className={styles.board}>
        <Chessboard position={renderOpeningFEN()} boardWidth={250} showBoardNotation={false}></Chessboard>
      </div>
      <div className={styles.description}>
        {renderOpeningMoves()}
        <br />
        <br />
        <i>{renderOpeningName()}</i>
      </div>
      <div className={styles.bottomContainer}>
      	<div className={styles.sliderContainer}>
      		<p><b>Depth</b>: {depth}</p>
      		<br />
      		<input className={styles.newRangeSlider} type="range" min="1" max="10" step="1" value={depth} onChange={e => setDepth(e.target.value)}></input>
      	</div>
      	<br />
      	<br />
        <button className={styles.newOpeningButton} onClick={newOpening}>
          New Opening!
        </button>
        <div className={styles.footer}>
          2024 ©{" "}
          <a href="https://github.com/glorialiu/chess_openings">
            <u>glo</u>
          </a>
          . openings powered by{" "}
          <a href="https://github.com/hayatbiralem/eco.json">
            <u>ECO</u>
          </a>
          .
          <br />
        </div>
      </div>
    </main>
  );
}
