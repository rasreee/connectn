import { makeAutoObservable } from 'mobx';

import { RootStore } from './rootStore';

export class GameInfoModel {
  playerOneName = 'Player One';
  playerTwoName = 'Player Two';
  dimensions = { cols: 7, rows: 6 };
  winNumber = 4;
}

export class GameInfoStore {
  model = new GameInfoModel();

  constructor(private root: RootStore) {
    makeAutoObservable(this, {}, { name: 'GameInfoStore' });
  }
}
