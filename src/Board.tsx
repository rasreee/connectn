import './Board.css';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { getPieceColor } from './lib/piece';
import { slotUtils } from './lib/slot';
import { useGame } from './useGame';
import { useTryPlacePiece } from './useTryPlacePiece';

export const Board = () => {
  const tryPlacePiece = useTryPlacePiece();
  const { info, state, outcome } = useGame();

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
        {Array.from(Array(info.rowCount), (_, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(info.columnCount), (_, column) => (
              <button
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                disabled={
                  Boolean(outcome) ||
                  slotUtils.isTaken(
                    slotUtils.normalize({ column, row }, info.rowCount),
                    state.pieces
                  )
                }
                onClick={() => tryPlacePiece(column)}
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
