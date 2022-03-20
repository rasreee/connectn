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

export const DEFAULT_GAME_INFO: GameInfo = {
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  dimensions: { width: 7, height: 6 },
  winNumber: 4,
};

export const initializeGameInfo = (): GameInfo => ({ ...DEFAULT_GAME_INFO });
