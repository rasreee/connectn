import './Board.css';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { getPieceColor } from './lib/piece';
import { getIsSlotTaken } from './lib/slot';
import { useGame } from './useGame';

export const Board = () => {
  const { info, state, outcome, placePiece } = useGame();

  return (
    <>
      <BoardInfo />
      <div
        className='Board'
        style={{
          width: info.columnCount * 50,
          height: info.rowCount * 50,
        }}
      >
        {/** TODO(2): placing game pieces
         * - how do utilize the provided board piece component to visualize the game state?
         */}
        {state.pieces.map((piece, i) => (
          <BoardPiece
            key={i}
            column={piece.slot.column}
            row={piece.slot.row}
            color={getPieceColor(piece, info)}
          />
        ))}
        {Array.from(Array(info.rowCount), (e, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(info.columnCount), (e, column) => (
              <button
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                disabled={
                  Boolean(outcome) ||
                  getIsSlotTaken({ column, row }, state.pieces)
                }
                onClick={() => placePiece(column, info.rowCount - row - 1)}
              >
                {row}, {column}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
