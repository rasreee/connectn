import { Piece } from './piece';

export interface GameState {
  // name of current player to place a piece
  currentPlayerName: string;
  // list of pieces currently placed
  pieces: Piece[];
}
