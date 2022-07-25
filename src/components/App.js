import "../css/app.css";
import CellGrid from "./CellGrid";
import React, { useState } from "react";
import GameOver from "./GameOver";

export const CellContext = React.createContext();

function App() {
  const [cells, setCells] = useState(initialCells);
  const [turn, setTurn] = useState(TURNS.X);
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);

  const cellContextValues = {
    handleCellClick,
  };

  function handleCellClick(id) {
    if (gameState !== GAME_STATES.PLAYING) return;
    const index = cells.findIndex((c) => c.id === id);
    if (cells[index].value !== "empty") return;

    const newCells = [...cells];

    newCells[index] = { ...newCells[index], value: turn };

    setCells(newCells);
    if (checkGame(newCells)) return;
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
  }

  function checkGame(currentCells) {
    for (const turnOption of Object.values(TURNS)) {
      for (let i = 0; i < 3; i++) {
        // Checking columns
        if (
          currentCells
            .filter((cell, index) => index % 3 === i)
            .every((cell) => cell.value === turnOption)
        ) {
          handleGameOver(false);
          return true;
        }
        // Checking rows
        else if (
          currentCells
            .filter((cell, index) => Math.trunc(index / 3) === i)
            .every((cell) => cell.value === turnOption)
        ) {
          handleGameOver(false);
          return true;
        }
      }
      // Checking diagonals
      for (const diagonal of DIAGONALS) {
        if (
          currentCells
            .filter((cell, index) => diagonal.includes(index))
            .every((cell) => cell.value === turnOption)
        ) {
          handleGameOver(false);
          return true;
        }
      }
    }
    if (currentCells.every((cell) => cell.value !== "empty")) {
      handleGameOver(true);
      return true;
    }
  }

  function handleGameOver(draw) {
    if (draw) {
      setGameState(GAME_STATES.DRAW);
      return;
    }
    if (turn === TURNS.X) setGameState(GAME_STATES.X_WON);
    if (turn === TURNS.O) setGameState(GAME_STATES.O_WON);
  }

  function restartGame() {
    setCells(initialCells);
    setGameState(GAME_STATES.PLAYING);
    setTurn(TURNS.X);
  }

  function currentlyPlaying() {
    return gameState === GAME_STATES.PLAYING;
  }

  return (
    <CellContext.Provider value={cellContextValues}>
      <div className={`app-container ${currentlyPlaying() ? "" : "fade"}`}>
        <CellGrid cells={cells} />
      </div>
      {!currentlyPlaying() && (
        <GameOver gameState={gameState} restartGame={restartGame} />
      )}
    </CellContext.Provider>
  );
}

const initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => ({
  id: number,
  value: "empty",
}));

const TURNS = {
  X: "x",
  O: "o",
};

const DIAGONALS = [
  [0, 4, 8],
  [2, 4, 6],
];

export const GAME_STATES = {
  PLAYING: "playing",
  X_WON: "x-won",
  O_WON: "o-won",
  DRAW: "draw",
};

export default App;
