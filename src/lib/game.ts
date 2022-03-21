import { createGrid, Grid } from './grid'
import { Player } from './player'

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

export type Board = Grid<Player>

export interface GameState {
  // name of current player to place a piece
  currentPlayer: Player
  // list of pieces currently placed
  board: Board
}

const defaultGameInfo: GameInfo = {
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  columnCount: 7,
  rowCount: 6,
  winNumber: 4,
}

export const createGameInfo = (): GameInfo => ({ ...defaultGameInfo })

export const createGameState = (
  gameInfo: GameInfo = defaultGameInfo,
): GameState => {
  const { columnCount, rowCount } = gameInfo

  return {
    currentPlayer: Player.None,
    board: createGrid<Player>(columnCount, rowCount, Player.None),
  }
}

export const getIsGameActive = (state: GameState): boolean => {
  return state.currentPlayer !== Player.None
}
