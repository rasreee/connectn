import { GameInfo } from './gameInfo';
import { Piece } from './piece';

export interface GameState {
  // name of current player to place a piece
  currentPlayerName: string;
  // list of pieces currently placed
  pieces: Piece[];
}

export function initializeGameState(info: GameInfo): GameState {
  return {
    currentPlayerName: info.playerOneName,
    pieces: [],
  };
}
