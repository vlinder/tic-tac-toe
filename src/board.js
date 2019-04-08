import React, { useState } from "react";

import { Square } from "./square";

const updateSquare = (squares, index) => {
  // This square has already been played.
  if (squares[index] > 0) return false;

  // Get the next move number.
  const moveNumber = Math.max(...squares) + 1;
  const newSquares = squares.slice();
  newSquares[index] = moveNumber;
  return newSquares;
};

const sum = (...num) => num.reduce((a, b) => a + b);

const getWinningSquares = squares => {
  const winning = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // crosses
    [2, 4, 6]
  ];

  const odd = x => x % 2 === 1;
  const evenNotZero = x => x > 0 && x % 2 === 0;

  return (
    winning.find(condition => {
      const values = condition.map(square => squares[square]);
      if (values.every(evenNotZero) || values.every(odd)) return true;
      return false;
    }) || []
  );
};

const getInitialState = () => Array.from({ length: 9 }, () => 0);

export const Board = props => {
  const [squares, setSquares] = useState(getInitialState());
  const winningSquares = getWinningSquares(squares);

  const makeMove = index => () => {
    const newSquares = updateSquare(squares, index);
    if (winningSquares.length || sum(...squares) === 45) {
      setSquares(getInitialState());
    } else if (newSquares) {
      setSquares(newSquares);
    }
  };

  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          makeMove={makeMove(index)}
          highlight={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
};
