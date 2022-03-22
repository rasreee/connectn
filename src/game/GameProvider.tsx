import { createGameInfo, createGameState } from 'lib/game'
import { useState } from 'react'

import { GameContext } from './GameContext'

export const GameProvider: React.FC = ({ children }) => {
  const [gameInfo, setGameInfo] = useState(createGameInfo())
  const [gameState, setGameState] = useState(createGameState(gameInfo))

  return (
    <GameContext.Provider
      value={{ gameInfo, setGameInfo, gameState, setGameState }}
    >
      {children}
    </GameContext.Provider>
  )
}
