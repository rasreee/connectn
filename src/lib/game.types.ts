import { Matrix } from './matrix'
import { MaybePlayer, Player } from './player'

export interface GameInfo {
  // name of one player
  playerOneName: string
  // name of other player
  playerTwoName: string
  // number of columns
  columnCount: number
  // number of rows
  rowCount: number
  // number of dots in a row required to win
  winNumber: number
}

export enum GameStep {
  Onboarding = 'Onboarding',
  Playing = 'Playing',
  Complete = 'Complete',
}

export interface GameState {
  // name of current player to place a piece
  currentPlayer: Player
  // list of pieces currently placed
  board: Matrix
  // step in the flow
  currentStep: GameStep
  // winner if any
  winner: MaybePlayer
}