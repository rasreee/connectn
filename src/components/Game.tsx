import { useGame } from 'game/GameContext'
import { createBoard, getNextBoard, Slot } from 'lib/board'
import { getNextPlayer, isPlayer, Player } from 'lib/player'
import { useEffect } from 'react'

import { Board } from './Board'

// Component that holds the structure of the game
export const Game = () => {
  const { gameState, setGameState, gameInfo } = useGame()

  // returns to blank state
  const resetGame = () => {
    const newBoard = createBoard(gameInfo.columnCount, gameInfo.rowCount)
    setGameState({ board: newBoard, currentPlayer: Player.PlayerOne })
  }

  // TODO(1): game state
  // - what needs to happen when the game is started?
  const playGame = () => {
    resetGame()
  }

  // TODO(2): place piece & check winner
  const onSlotClick = (slotClicked: Slot) => {
    setGameState((prevState) => {
      const { currentPlayer, board } = prevState
      const { column, row } = slotClicked
      console.log(`Request player ${currentPlayer} at (${column}, ${row})`)
      // don't do anything if column is full
      if (board[column].every((slot) => isPlayer(slot))) return prevState
      const nextBoard = getNextBoard(board, column, currentPlayer)

      return { board: nextBoard, currentPlayer: getNextPlayer(currentPlayer) }
    })
  }

  useEffect(() => {
    playGame()
  }, [])

  return (
    <div className='Game'>
      <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
      <Board
        gameState={gameState}
        gameInfo={gameInfo}
        onSlotClick={onSlotClick}
      />
    </div>
  )
}
