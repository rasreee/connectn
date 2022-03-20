import './Board.css';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { GameInfo } from './lib/gameInfo';
import { GameState } from './lib/gameState';
import { Piece } from './lib/piece';
import { Slot, slotUtils } from './lib/slot';
import { useGame } from './useGame';

const getPieceColor = (piece: Piece, info: GameInfo) => {
  const isPlayerOne = piece.playerName === info.playerOneName;

  return isPlayerOne ? 'red' : 'black';
};

export const Board = () => {
  const { info, state, outcome, setState } = useGame();

  const tryPlacePiece = (column: number) => {
    const nextRow = state.pieces.filter(
      (piece) => piece.slot.column === column
    ).length;

    if (nextRow === info.dimensions.cols - 1) return;

    const newPiece: Piece = {
      slot: { column, row: nextRow },
      playerName: state.currentPlayerName,
    };

    const nextPlayer =
      state.currentPlayerName === info.playerOneName
        ? info.playerTwoName
        : info.playerOneName;

    const nextGameState: GameState = {
      ...state,
      pieces: [...state.pieces, newPiece],
      currentPlayerName: nextPlayer,
    };

    setState(nextGameState);
  };

  const getIsSlotDisabled = (slot: Slot) =>
    Boolean(outcome) ||
    slotUtils.isTaken(
      slotUtils.normalize(
        slot,
        info.dimensions.cols
      ) /* todo shouldn't have to pass in width */,
      state.pieces
    );

  const renderSlotText = (slotIndices: Slot) => {
    const slot = slotUtils.normalize(slotIndices, info.dimensions.rows);

    return `(${slot.column}, ${slot.row})`;
  };

  return (
    <>
      <div className='flex'>
        <BoardInfo />
      </div>
      <div
        className='Board'
        style={{
          width: info.dimensions.cols * 50,
          height: info.dimensions.cols * 50,
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
        {Array.from(Array(info.dimensions.rows), (_, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(info.dimensions.cols), (_, column) => (
              <button
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                disabled={getIsSlotDisabled({ column, row })}
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
