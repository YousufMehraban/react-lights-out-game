import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i ++){
      let newboard = []
      for (let x = 0; x < ncols; x ++){
          newboard.push(Math.random() < chanceLightStartsOn)
        }
        initialBoard.push(newboard)
      }
    return initialBoard;
  }

  function hasWon(){
       return board.every(x => x.every(i => !i ))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.map(i => [...i])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      // TODO: return the copy
      return oldBoardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
    if (hasWon()) {
      return <h1>You Win!</h1>;
    }
  
  // make table board

  // TODO
  let tblBoard = [];

  for (let row = 0; row < nrows; row++) {
    let colBoard = [];
    for (let col = 0; col < ncols; col++) {
      let coord = `${row}-${col}`;
      colBoard.push(
        <Cell
          key={coord}
          isLit={board[row][col]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={row}>{colBoard}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );

}

export default Board;


