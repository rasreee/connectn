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
  board: Piece[];
  // next player to go
  nextPlayer: Player;
  // step in the flow
  currentStep: GameStep;
  // winner if any
  winner: Player;
}

export function initGameState(): GameStateModel {
  return {
    currentPlayer: Player.None,
    nextPlayer: Player.None,
    board: [],
    currentStep: GameStep.Onboarding,
    winner: Player.None,
  };
}
