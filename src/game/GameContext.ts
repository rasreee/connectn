import { GameInfo, GameState } from 'lib/game'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface IGameContext {
  gameInfo: GameInfo
  setGameInfo: Dispatch<SetStateAction<GameInfo>>
  gameState: GameState
  setGameState: Dispatch<SetStateAction<GameState>>
}

export const GameContext = createContext<IGameContext | undefined>(undefined)

export const useGame = (): IGameContext => {
  const context = useContext(GameContext)

  if (!context)
    throw new Error(
      'GameContext was undefined. Make sure that component is wrapped with GameProvider.',
    )

  return { ...context }
}
