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
  // next player to go
  nextPlayer: Player;
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
    this.nextPlayer = data.nextPlayer;
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
    this.nextPlayer = Player.None;
    this.board = [];
    this.currentStep = GameStep.Onboarding;
    this.winner = Player.None;
  };

  play = () => {
    this.reset();
    this.currentPlayer = Player.PlayerOne;
    this.nextPlayer = Player.PlayerTwo;
    this.currentStep = GameStep.Playing;
  };

  placePiece = ({ column: columnIndex }: { column: number }) => {
    const currentPlayer = this.currentPlayer;
    const cols = this.store.gameInfo.dimensions.cols;

    const board = this.board;

    let nextRow = 0;

    while (
      nextRow < cols &&
      board.find(
        (item) => item.column === columnIndex && item.row === nextRow
      ) !== null
    ) {
      nextRow += 1;
    }
    if (nextRow >= cols - 1) return;

    this.board = [...board, new Piece(columnIndex, nextRow, currentPlayer)];
  };
}
