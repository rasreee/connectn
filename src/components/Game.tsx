import { GameInfoProvider } from 'contexts/GameInfoContext'
import { createBoard, getNextGameState, Slot } from 'lib/board'
import { createGameState, GameInfo } from 'lib/game'
import { Player } from 'lib/player'
import { useState } from 'react'

import { Board } from './Board'

// Component that holds the structure of the game
export const Game = ({ gameInfo }: { gameInfo: GameInfo }) => {
  const [gameState, setGameState] = useState(createGameState(gameInfo))

  // returns to blank state
  const resetGame = () => {
    const newBoard = createBoard(gameInfo.columnCount, gameInfo.rowCount)
    setGameState({ board: newBoard, currentPlayer: Player.PlayerOne })
  }

  // TODO(2): place piece & check winner
  const onSlotClick = (slotClicked: Slot) => {
    setGameState((prevState) => {
      return getNextGameState(prevState, slotClicked.column)
    })
  }

  return (
    <GameInfoProvider gameInfo={gameInfo}>
      <div className='Game'>
        <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
        <Board
          gameState={gameState}
          gameInfo={gameInfo}
          onSlotClick={onSlotClick}
        />
      </div>
    </GameInfoProvider>
  )
}
