import './Board.css';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { getPieceColor } from './lib/piece';
import { Slot, slotUtils } from './lib/slot';
import { useGame } from './useGame';
import { useTryPlacePiece } from './useTryPlacePiece';

export const Board = () => {
  const tryPlacePiece = useTryPlacePiece();
  const { info, state, outcome } = useGame();

  const getSlotDisabled = (slot: Slot) =>
    Boolean(outcome) ||
    slotUtils.isTaken(slotUtils.normalize(slot, info.rowCount), state.pieces);

  const renderSlotText = (slotIndices: Slot) => {
    const slot = slotUtils.normalize(slotIndices, info.rowCount);

    return `(${slot.column}, ${slot.row})`;
  };

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
                disabled={getSlotDisabled({ column, row })}
                onClick={() => tryPlacePiece(column)}
              >
                {renderSlotText({ column, row })}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
