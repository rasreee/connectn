import { action, computed, makeAutoObservable, observable } from 'mobx';

import { GameStep } from '../lib/gameStep';
import { createMatrix, Matrix } from '../lib/matrix';
import { Piece } from '../lib/piece';
import { Player } from '../lib/types';
import { GameStateModel, initGameState } from './gameState.model';
import { RootStore } from './rootStore';

export class GameStateStore {
  // name of current player to place a piece
  @observable
  currentPlayer: Player;
  // list of pieces currently placed
  @observable
  board: Matrix;
  // next player to go
  @observable
  nextPlayer: Player;
  // step in the flow
  @observable
  currentStep: GameStep;
  // winner if any
  @observable
  winner: Player;

  constructor(private store: RootStore) {
    this.updateFromJson(initGameState(store.gameInfo));
    makeAutoObservable(this, {}, { name: 'GameStateStore' });
  }

  private updateFromJson = (data: GameStateModel) => {
    this.currentPlayer = data.currentPlayer;
    this.nextPlayer = data.nextPlayer;
    this.board = data.board;
    this.currentStep = data.currentStep;
    this.winner = data.winner;
  };

  @computed
  get isDraw(): boolean {
    return false;
  }

  @computed
  get isComplete(): boolean {
    return this.isDraw || this.winner !== Player.None;
  }

  @action
  reset = () => {
    this.currentPlayer = Player.None;
    this.nextPlayer = Player.None;
    this.board = createMatrix(this.store.gameInfo.dimensions, Piece);
    this.currentStep = GameStep.Onboarding;
    this.winner = Player.None;
  };

  @action
  play = () => {
    this.reset();
    this.currentPlayer = Player.PlayerOne;
    this.nextPlayer = Player.PlayerTwo;
    this.currentStep = GameStep.Playing;
  };

  @action
  placePiece = ({ column: columnIndex }: { column: number }) => {
    const boardColumn = this.board[columnIndex];

    let nextRow = 0;

    while (boardColumn[nextRow] !== null) {
      if (nextRow === this.store.gameInfo.dimensions.cols) return;

      nextRow += 1;
    }

    this.board[columnIndex][nextRow] = {
      column: columnIndex,
      row: nextRow,
      player: this.currentPlayer,
    };
  };
}
