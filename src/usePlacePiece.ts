import { useGameContext } from './GameContext';
import { GameState } from './lib/gameState';
import { logger } from './lib/logger';
import { Piece } from './lib/piece';
import { Slot } from './lib/slot';

export function usePlacePiece() {
  const { info, state, setState } = useGameContext();

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  function placePiece({ column, row }: Slot) {
    logger.info(`📍 placePiece(column: ${column}, row: ${row})`);

    const nextRow = state.pieces.filter(
      (piece) => piece.slot.column === column
    ).length;

    if (nextRow === info.rowCount) return state;

    const newPiece: Piece = {
      slot: { column, row },
      playerName: state.currentPlayerName,
    };

    const newCurrentPlayerName =
      state.currentPlayerName === info.playerOneName
        ? info.playerTwoName
        : info.playerOneName;

    const nextGameState: GameState = {
      ...state,
      pieces: [...state.pieces, newPiece],
      currentPlayerName: newCurrentPlayerName,
    };

    setState(nextGameState);
  }

  return placePiece;
}
