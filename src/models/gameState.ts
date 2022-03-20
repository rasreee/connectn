import { createMatrix, Matrix } from 'lib/matrix';

import { GameInfo } from './gameInfo';
import { Piece } from './piece';
import { Player } from './player';

export enum GameStep {
  Onboarding = 'Onboarding',
  Playing = 'Playing',
  Complete = 'Complete',
}

export interface GameStateModel {
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
}

export function initGameState(gameInfo: GameInfo): GameStateModel {
  return {
    currentPlayer: Player.None,
    nextPlayer: Player.None,
    board: createMatrix(gameInfo.dimensions, Piece),
    currentStep: GameStep.Onboarding,
    winner: Player.None,
  };
}
