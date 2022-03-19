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

export const DEFAULT_GAME_INFO: GameInfo = {
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  columnCount: 7,
  rowCount: 6,
  winNumber: 4,
};

export const initializeGameInfo = (): GameInfo => ({ ...DEFAULT_GAME_INFO });
