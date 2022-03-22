import { createGameState, defaultGameInfo, GameInfo } from 'lib/game'
import { useState } from 'react'

import { GameContext } from './GameContext'

export interface GameProviderProps {
  initialGameInfo?: GameInfo
}

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  initialGameInfo = defaultGameInfo,
}) => {
  const [gameInfo, setGameInfo] = useState(initialGameInfo)
  const [gameState, setGameState] = useState(createGameState(gameInfo))

  return (
    <GameContext.Provider
      value={{ gameInfo, setGameInfo, gameState, setGameState }}
    >
      {children}
    </GameContext.Provider>
  )
}
