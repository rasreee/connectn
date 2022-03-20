import { GameInfo } from 'lib/gameInfo';
import { GameStep } from 'lib/gameStep';
import { createMatrix, Matrix } from 'lib/matrix';
import { Piece } from 'lib/piece';
import { Player } from 'lib/types';

export class GameStateModel {
  // name of current player to place a piece
  currentPlayer: Player;
  // list of pieces currently placed
  board: Matrix;
  // next player to go
  nextPlayer: Player;
  // step in the flow
  currentStep: GameStep;
  // winner if any
  winner: Player;

  constructor(gameInfo: GameInfo) {
    this.currentPlayer = Player.None;
    this.nextPlayer = Player.None;
    this.board = createMatrix(gameInfo.dimensions, Piece);
    this.currentStep = GameStep.Onboarding;
    this.winner = Player.None;
  }
}
