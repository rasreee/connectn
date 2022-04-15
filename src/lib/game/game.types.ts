import { Dimensions } from 'lib/grid'

import { OutcomeType, Player } from './game.constants'

export type GameInfo = Dimensions & {
  // name of one player
  playerOneName: string
  // name of other player
  playerTwoName: string
  // number of dots in a y required to win
  winNumber: number
}

export type GameSettings = GameInfo & { rememberSettings: boolean }

export interface Outcome {
  type: OutcomeType
  winner?: Player
}
