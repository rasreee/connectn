import { createGameState, GameInfo } from 'lib/game'
import { useReducer } from 'react'

import { gameReducer } from './gameReducer'

export const useGameReducer = (gameInfo: GameInfo) => {
  return useReducer(gameReducer, createGameState(gameInfo))
}
