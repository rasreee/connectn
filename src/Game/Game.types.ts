export enum GameStep {
  Onboarding = 'Onboarding',
  Playing = 'Playing',
  Complete = 'Complete',
}

export interface GameInfo {
  // name of one player
  playerOneName: string;
  // name of other player
  playerTwoName: string;
  // number of columns
  columnCount: number;
  // number of rows
  rowCount: number;
  // number of dots in a row required to win
  winNumber: number;
}

export interface Piece {
  playerName: string;
  column: number;
  row: number;
}

export interface GameState {
  // name of current player to place a piece
  currentPlayerName: string;
  // list of pieces currently placed
  pieces: Piece[];
}
