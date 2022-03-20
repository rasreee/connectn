import { action, computed, makeObservable, observable } from 'mobx';
import { GameOutcome, GameStep, initGameState } from 'models/gameState';
import { cloneMatrix, Matrix } from 'models/matrix';

import { Player } from '../models/player';
import { GlobalStore } from './GlobalStore';

export class GameStateStore {
  // name of current player to place a piece
  @observable
  currentPlayer: Player;
  // list of pieces currently placed
  @observable
  board: Matrix<Player>;
  // step in the flow
  @observable
  currentStep: GameStep;
  // winner if any
  @observable
  winner: Player;

  @computed
  get outcome(): GameOutcome {
    if (this.winner) return GameOutcome.Win;

    const dimensions = this.store.gameInfo.dimensions;
    const { cols, rows } = dimensions;
    const isDraw = this.board.length === cols * rows;

    if (isDraw) return GameOutcome.Draw;

    return GameOutcome.None;
  }

  constructor(private store: GlobalStore) {
    const data = initGameState(store.gameInfo);
    this.currentPlayer = data.currentPlayer;
    this.board = data.board;
    this.currentStep = data.currentStep;
    this.winner = data.winner;
    makeObservable(this);
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
  placePiece = ({ column }: { column: number }) => {
    const player = this.currentPlayer;
    const rows = this.store.gameInfo.dimensions.rows;

    const board = this.board;

    let nextRow = 0;
    while (nextRow < rows && board[column][nextRow]) {
      nextRow += 1;
    }

    if (nextRow >= rows) return;

    const newBoard = cloneMatrix(board);
    newBoard[column][nextRow] = player;

    this.board = newBoard;

    this.currentPlayer =
      player === Player.PlayerOne ? Player.PlayerTwo : Player.PlayerOne;
  };
}
