import { Dimensions } from 'lib/grid'

import { GameInfo, GameSettings } from './game.types'

export enum GameStatus {
  Onboarding = 'Onboarding',
  InProgress = 'InProgress',
  Complete = 'Complete',
}

export enum Player {
  PlayerOne = 1,
  PlayerTwo = 2,
}

export const PlayerColor = Object.freeze({
  PlayerOne: 'red',
  PlayerTwo: 'black',
})

export enum OutcomeType {
  Draw = 'Draw',
  Win = 'Win',
}

const defaultDimensions: Dimensions = Object.freeze({
  columnCount: 7,
  rowCount: 6,
})

export const defaultGameInfo: GameInfo = Object.freeze({
  playerOneName: 'Player One',
  playerTwoName: 'Player Two',
  winNumber: 4,
  ...defaultDimensions,
})

export const defaultSettings: GameSettings = Object.freeze({
  ...defaultGameInfo,
  rememberSettings: false,
})

export const MIN_SIDE_LENGTH = 1
export const MIN_WIN_NUMBER = 1

export const SETTINGS_LOCAL_STORAGE_KEY = 'connect-n-game-settings' as const
