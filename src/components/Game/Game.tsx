import styled from '@emotion/styled'
import { Board } from 'components/Board'
import { createBoard, getNextGameState } from 'lib/board'
import { createGameState, GameInfo } from 'lib/game'
import { Slot } from 'lib/grid'
import { Player } from 'lib/player'
import { useState } from 'react'

import { GameInfoProvider } from './GameInfoProvider'
import { GameStatusBar } from './GameStatusBar'

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
      <Container role='contentinfo'>
        <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
        <GameStatusBar gameState={gameState} />
        <Board
          gameState={gameState}
          gameInfo={gameInfo}
          onSlotClick={onSlotClick}
        />
      </Container>
    </GameInfoProvider>
  )
}

const Container = styled.div``
