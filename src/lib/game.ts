import { BoardData } from './board'
import { createGrid, Dimensions } from './grid'
import { Player } from './player'

export interface GameInfo extends Dimensions {
  // name of one player
  playerOneName: string
  // name of other player
  playerTwoName: string
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
  board: BoardData
}

export const defaultGameInfo: GameInfo = Object.freeze({
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  columnCount: 7,
  rowCount: 6,
  winNumber: 4,
})

export const createGameInfo = (
  initialData: Partial<GameInfo> = {},
): GameInfo => ({ ...defaultGameInfo, ...initialData })

export const createGameState = (
  initialGameInfo?: Partial<GameInfo>,
): GameState => {
  const gameInfo = { ...defaultGameInfo, ...initialGameInfo }

  const { columnCount, rowCount } = gameInfo

  return {
    currentPlayer: Player.PlayerOne,
    board: createGrid<Player>(columnCount, rowCount, Player.None),
  }
}
