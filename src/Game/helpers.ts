import { GameInfo, GameState, Piece } from './types';

export const getNextGameState = ({
  state,
  info,
  column,
}: {
  column: number;
  state: GameState;
  info: GameInfo;
}): GameState => {
  const nextRow = state.pieces.filter(
    (piece) => piece.column === column
  ).length;

  if (nextRow === info.rowCount) return state;

  const newPiece: Piece = {
    column,
    row: nextRow,
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

  return nextGameState;
};
