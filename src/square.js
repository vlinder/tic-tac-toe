import React from "react";

const getSymbol = number => {
  if (!number) {
    return "";
  }
  return number % 2 === 0 ? "⤫" : "○";
};

export const Square = ({ value, makeMove, highlight }) => (
  <div
    className={"square" + (highlight ? " highlight" : "")}
    onClick={makeMove}
  >
    {getSymbol(value)}
  </div>
);
