import React, { useContext } from "react";
import { CellContext } from "./App";

export default function Cell({ cell }) {
  const { handleCellClick } = useContext(CellContext);

  return (
    <div
      onClick={() => {
        handleCellClick(cell.id);
      }}
      className={`cell ${cell.value}`}
    ></div>
  );
}
