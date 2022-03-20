import { action, computed, makeObservable, observable } from 'mobx';
import { GameStateModel, GameStep, initGameState } from 'models/gameState';
import { Piece } from 'models/piece';

import { Player } from '../models/player';
import { RootStore } from './RootStore';

export enum GameOutcome {
  Win,
  Draw,
  None,
}
export class GameStateStore {
  // name of current player to place a piece
  @observable
  currentPlayer: Player;
  // list of pieces currently placed
  @observable
  board: Piece[];
  // step in the flow
  @observable
  currentStep: GameStep;
  // winner if any
  @observable
  winner: Player;

  constructor(private store: RootStore) {
    this.updateFromJson(initGameState());
    makeObservable(this);
  }

  updateFromJson = (data: GameStateModel) => {
    this.currentPlayer = data.currentPlayer;
    this.board = data.board;
    this.currentStep = data.currentStep;
    this.winner = data.winner;
  };

  @computed
  get outcome(): GameOutcome {
    if (this.winner) return GameOutcome.Win;

    const dimensions = this.store.gameInfo.dimensions;
    const { cols, rows } = dimensions;
    const isDraw = this.board.length === cols * rows;

    if (isDraw) return GameOutcome.Draw;

    return GameOutcome.None;
  }

  @action
  reset = () => {
    this.currentPlayer = Player.None;
    this.board = [];
    this.currentStep = GameStep.Onboarding;
    this.winner = Player.None;
  };

  @action
  play = () => {
    this.reset();
    this.currentPlayer = Player.PlayerOne;
    this.currentStep = GameStep.Playing;
  };

  @action
  placePiece = ({ column: columnIndex }: { column: number }) => {
    const currentPlayer = this.currentPlayer;
    const rows = this.store.gameInfo.dimensions.rows;

    const board = this.board;

    let nextRow = 0;
    while (
      nextRow < rows &&
      board.find(
        (item) => item.column === columnIndex && item.row === nextRow
      ) !== null
    ) {
      nextRow += 1;
    }
    if (nextRow >= rows) return;

    this.board = [...board, new Piece(columnIndex, nextRow, currentPlayer)];
    this.currentPlayer =
      currentPlayer === Player.PlayerOne ? Player.PlayerTwo : Player.PlayerOne;
  };
}
