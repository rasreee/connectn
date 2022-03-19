import { GameInfo } from './gameInfo';

export interface Piece {
  playerName: string;
  column: number;
  row: number;
}

export const getPieceColor = (piece: Piece, info: GameInfo) => {
  const isPlayerOne = piece.playerName === info.playerOneName;

  return isPlayerOne ? 'red' : 'green';
};
