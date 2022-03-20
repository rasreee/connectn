import { makeAutoObservable } from 'mobx';
import { GameStateModel, GameStep, initGameState } from 'models/gameState';
import { Piece } from 'models/piece';

import { Player } from '../models/player';
import { RootStore } from './RootStore';

export class GameStateStore {
  // name of current player to place a piece
  currentPlayer: Player;
  // list of pieces currently placed
  board: Piece[];
  // step in the flow
  currentStep: GameStep;
  // winner if any
  winner: Player;

  constructor(private store: RootStore) {
    this.updateFromJson(initGameState());
    makeAutoObservable(this, {}, { name: 'GameStateStore' });
  }

  updateFromJson = (data: GameStateModel) => {
    this.currentPlayer = data.currentPlayer;
    this.board = data.board;
    this.currentStep = data.currentStep;
    this.winner = data.winner;
  };

  get isDraw(): boolean {
    return false;
  }

  get isComplete(): boolean {
    return this.isDraw || this.winner !== Player.None;
  }

  reset = () => {
    this.currentPlayer = Player.None;
    this.board = [];
    this.currentStep = GameStep.Onboarding;
    this.winner = Player.None;
  };

  play = () => {
    this.reset();
    this.currentPlayer = Player.PlayerOne;
    this.currentStep = GameStep.Playing;
  };

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
