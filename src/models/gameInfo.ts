import { Dimensions } from './matrix';

export interface GameInfo {
  // name of one player
  playerOneName: string;
  // name of other player
  playerTwoName: string;
  // dimensions of the board
  dimensions: Dimensions;
  // number of dots in a row required to win
  winNumber: number;
}

export interface GameInfoModel {
  // name of one player
  playerOneName: string;
  // name of other player
  playerTwoName: string;
  // dimensions of the board
  dimensions: Dimensions;
  // number of dots in a row required to win
  winNumber: number;
}

export function initGameInfo(): GameInfoModel {
  return {
    playerOneName: 'Player One',
    playerTwoName: 'Player Two',
    dimensions: { cols: 7, rows: 6 },
    winNumber: 4,
  };
}
