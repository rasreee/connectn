import { GameInfo } from 'lib/gameInfo';
import { Dimensions } from 'lib/matrix';
import { makeAutoObservable, observable } from 'mobx';

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
  // name of one player
  @observable
  playerOneName: string;
  // name of other player
  @observable
  playerTwoName: string;
  // dimensions of the board
  @observable
  dimensions: Dimensions;
  // number of dots in a row required to win
  @observable
  winNumber: number;

  constructor(private store: RootStore) {
    this.updateFromJson(initGameInfo());
    makeAutoObservable(this, {}, { name: 'GameInfoStore' });
  }

  private updateFromJson = (data: GameInfo) => {
    this.playerOneName = data.playerOneName;
    this.playerTwoName = data.playerTwoName;
    this.dimensions = data.dimensions;
    this.winNumber = data.winNumber;
  };
}
