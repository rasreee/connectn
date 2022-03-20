import { GameInfo } from 'lib/gameInfo';
import { GameStep } from 'lib/gameStep';
import { createMatrix, Matrix } from 'lib/matrix';
import { Piece } from 'lib/piece';
import { Player } from 'lib/types';

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
