import React from "react";
import Cell from "./Cell";

export default function CellGrid({ cells }) {
  return (
    <div className="cell-grid">
      {cells.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
}
