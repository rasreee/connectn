import { GameInfoContext } from 'contexts/GameInfoContext'
import { defaultGameInfo, GameInfo } from 'lib/game'
import { useState } from 'react'

export interface GameInfoProviderProps {
  gameInfo?: GameInfo
}

export const GameInfoProvider: React.FC<GameInfoProviderProps> = ({
  children,
  gameInfo: initialGameInfo = defaultGameInfo,
}) => {
  const [gameInfo, setGameInfo] = useState(initialGameInfo)

  return (
    <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
      {children}
    </GameInfoContext.Provider>
  )
}
