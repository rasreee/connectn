import { GameInfo, GameState, GameStep } from './game.types'
import { initializeMatrix } from './matrix'
import { MaybePlayer, Player } from './player'

const defaultGameInfo: GameInfo = {
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  columnCount: 7,
  rowCount: 6,
  winNumber: 4,
}

export function initializeGameInfo(): GameInfo {
  return { ...defaultGameInfo }
}

export function initializeGameState(gameInfo: GameInfo): GameState {
  const { columnCount, rowCount } = gameInfo

  return {
    currentPlayer: Player.PlayerOne,
    board: initializeMatrix(columnCount, rowCount),
    currentStep: GameStep.Onboarding,
    winner: MaybePlayer.None,
  }
}
