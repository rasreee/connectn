import { GameInfo } from './gameInfo';
import { initMatrix } from './matrix';
import { Player } from './player';

export enum GameStep {
  Onboarding = 'Onboarding',
  Playing = 'Playing',
  Complete = 'Complete',
}

export enum GameOutcome {
  Win,
  Draw,
  None,
}

export interface GameState {
  // name of current player to place a piece
  currentPlayer: Player;
  // 2d matrix to represent the board/grid
  board: number[][];
  // next player to go
  nextPlayer: Player;
  // step in the flow
  currentStep: GameStep;
  // winner if any
  winner: Player;
}

export function initGameState(gameInfo: GameInfo): GameState {
  const { cols, rows } = gameInfo.dimensions;

  return {
    currentPlayer: Player.PlayerOne,
    nextPlayer: Player.PlayerTwo,
    board: initMatrix(cols, rows, Player.None),
    currentStep: GameStep.Onboarding,
    winner: Player.None,
  };
}
