import { BoardData, Piece } from './board'
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
  // last placed piece
  lastPlacedPiece: Piece | null
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
  initialGameInfo: Partial<GameInfo> = {},
  initialGameState: Partial<GameState> = {},
): GameState => {
  const gameInfo: GameInfo = { ...defaultGameInfo, ...initialGameInfo }

  const { columnCount, rowCount } = gameInfo

  const defaultGameState = {
    currentPlayer: Player.PlayerOne,
    board: createGrid<Player>(columnCount, rowCount, Player.None),
    lastPlacedPiece: null,
  }

  return { ...defaultGameState, ...initialGameState }
}
