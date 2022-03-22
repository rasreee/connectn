import { GameInfo } from 'lib/game'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface IGameInfoContext {
  gameInfo: GameInfo
  setGameInfo: Dispatch<SetStateAction<GameInfo>>
}

export const GameInfoContext = createContext<IGameInfoContext | undefined>(
  undefined,
)

export const useGameInfo = (): IGameInfoContext => {
  const context = useContext(GameInfoContext)

  if (!context)
    throw new Error(
      'GameInfoContext was undefined. Make sure that component is wrapped with GameInfoProvider.',
    )

  return { ...context }
}
