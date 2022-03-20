import { action, computed, makeObservable, observable } from 'mobx';
import { GameInfo, initGameInfo } from 'models/gameInfo';
import {
  GameOutcome,
  GameState,
  GameStep,
  initGameState,
} from 'models/gameState';
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

  constructor(private store: GlobalStore) {
    const data = initGameState(initGameInfo());
    this.updateWithJson(data);
    makeObservable(this);
  }

  @computed
  get outcome(): GameOutcome {
    if (this.winner !== Player.None) return GameOutcome.Win;

    const dimensions = this.store.gameInfo.dimensions;
    const { cols, rows } = dimensions;
    const isDraw = this.board.length === cols * rows;

    if (isDraw) return GameOutcome.Draw;

    return GameOutcome.None;
  }

  @action
  updateWithJson = (data: GameState) => {
    this.currentPlayer = data.currentPlayer;
    this.board = data.board;
    this.currentStep = data.currentStep;
    this.winner = data.winner;
  };

  @action
  reset = () => {
    const data = initGameState(initGameInfo());
    this.updateWithJson(data);
  };

  @action
  play = (gameInfo: GameInfo = initGameInfo()) => {
    const data = initGameState(gameInfo);
    this.updateWithJson(data);
  };

  @action
  placePiece = ({ column }: { column: number }) => {
    const player = this.currentPlayer;
    const { rows } = this.store.gameInfo.dimensions;

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
