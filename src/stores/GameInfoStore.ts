import { computed, makeAutoObservable, observable } from 'mobx';
import { Dimensions } from 'models/dimensions';
import { GameInfo, initGameInfo } from 'models/gameInfo';
import { Player } from 'models/player';

import { RootStore } from './RootStore';

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

  getPlayerName = (player: Player) =>
    computed(() =>
      player !== Player.PlayerOne ? this.playerTwoName : this.playerOneName
    ).get();
}
