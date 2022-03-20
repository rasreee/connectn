import { makeAutoObservable } from 'mobx';

import { GameStep } from '../lib/gameStep';
import { createMatrix } from '../lib/matrix';
import { Piece } from '../lib/piece';
import { Player } from '../lib/types';
import { GameStateModel } from './gameState.model';
import { RootStore } from './rootStore';

export class GameStateStore {
  model: GameStateModel;

  constructor(private root: RootStore) {
    this.model = new GameStateModel(root.gameInfo.model);
    makeAutoObservable(this, {}, { name: 'GameStateStore' });
  }

  get isDraw(): boolean {
    return false;
  }

  get isComplete(): boolean {
    return this.isDraw || this.model.winner !== Player.None;
  }

  reset = () => {
    this.model.currentPlayer = Player.None;
    this.model.nextPlayer = Player.None;
    this.model.board = createMatrix(this.root.gameInfo.model.dimensions, Piece);
    this.model.currentStep = GameStep.Onboarding;
    this.model.winner = Player.None;
  };

  play = () => {
    this.reset();
    this.model.currentPlayer = Player.PlayerOne;
    this.model.nextPlayer = Player.PlayerTwo;
    this.model.currentStep = GameStep.Playing;
  };

  placePiece = ({ column: columnIndex }: { column: number }) => {
    const boardColumn = this.model.board[columnIndex];

    let nextRow = 0;

    while (boardColumn[nextRow] !== null) {
      if (nextRow === this.root.gameInfo.model.dimensions.cols) return;

      nextRow += 1;
    }

    this.model.board[columnIndex][nextRow] = {
      column: columnIndex,
      row: nextRow,
      player: this.model.currentPlayer,
    };
  };
}
