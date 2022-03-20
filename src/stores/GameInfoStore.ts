import { computed, makeObservable, observable } from 'mobx';
import { Dimensions } from 'models/dimensions';
import { initGameInfo } from 'models/gameInfo';
import { Player } from 'models/player';

import { GlobalStore } from './GlobalStore';

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

  constructor(private store: GlobalStore) {
    const data = initGameInfo();
    this.playerOneName = data.playerOneName;
    this.playerTwoName = data.playerTwoName;
    this.dimensions = data.dimensions;
    this.winNumber = data.winNumber;
    makeObservable(this);
  }

  updateDimensions = (key: keyof Dimensions, value: number) => {
    const oldDimensions = this.dimensions;

    this.dimensions = {
      ...oldDimensions,
      [key]: value,
    };
  };

  getPlayerName = (player: Player) =>
    computed(() =>
      player !== Player.PlayerOne ? this.playerTwoName : this.playerOneName
    ).get();
}
