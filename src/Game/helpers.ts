import { GameInfo, GameState, Piece } from './types';

export const getNextRow = (column: number, gameState: GameState): number => {
  const piecesForColumn = gameState.pieces.filter(
    (piece) => piece.column === column
  );

  return piecesForColumn.length;
};

export const getNextGameState = ({
  gameState,
  gameInfo,
  column,
}: {
  column: number;
  gameState: GameState;
  gameInfo: GameInfo;
}): GameState => {
  const nextRow = gameState.pieces.filter(
    (piece) => piece.column === column
  ).length;

  if (nextRow === gameInfo.rowCount) return gameState;

  const newPiece: Piece = {
    column,
    row: nextRow,
    playerName: gameState.currentPlayerName,
  };

  const newCurrentPlayerName =
    gameState.currentPlayerName === gameInfo.playerOneName
      ? gameInfo.playerTwoName
      : gameInfo.playerOneName;

  const nextGameState: GameState = {
    ...gameState,
    pieces: [...gameState.pieces, newPiece],
    currentPlayerName: newCurrentPlayerName,
  };

  return nextGameState;
};
