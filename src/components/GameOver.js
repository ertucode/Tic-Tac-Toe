import React from "react";
import { GAME_STATES } from "./App";

export default function GameOver({ gameState, restartGame }) {
  function handleGameOverText() {
    if (gameState === GAME_STATES.X_WON) {
      return "X won";
    } else if (gameState === GAME_STATES.O_WON) {
      return "O won";
    } else {
      return "Draw";
    }
  }

  return (
    <div className="game-over__container">
      <div className="game-over__text">{handleGameOverText()}</div>
      <button className="game-over__button" onClick={() => restartGame()}>
        Replay
      </button>
    </div>
  );
}
