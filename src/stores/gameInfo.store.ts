import { Dimensions } from 'lib/matrix';
import { makeAutoObservable } from 'mobx';

import { RootStore } from './rootStore';

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

export class GameInfoStore {
  model: GameInfoModel;

  constructor(private root: RootStore) {
    this.model = initGameInfo();
    makeAutoObservable(this, {}, { name: 'GameInfoStore' });
  }
}
