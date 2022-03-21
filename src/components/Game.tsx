import { Slot } from 'lib/board'
import { createGameInfo, GameInfo, getIsGameActive } from 'lib/game'
import { useEffect, useState } from 'react'

import { Board } from './Board'
import { GameActionType } from './gameReducer'
import { Onboarding } from './Onboarding'
import { useGameReducer } from './useGameReducer'

// Component that holds the structure of the game
export const Game = () => {
  const [gameInfo, setGameInfo] = useState(createGameInfo())
  const [state, dispatch] = useGameReducer(gameInfo)

  // TODO(1): game state
  // returns to blank state
  const resetGame = () =>
    dispatch({ type: GameActionType.RESET, payload: { gameInfo } })

  // TODO(1): game state
  // - what needs to happen when the game is started?
  const playGame = () => {
    dispatch({ type: GameActionType.PLAY })
  }

  // TODO(2): place piece & check winner
  const onSlotClick = (slotClicked: Slot) => {
    dispatch({
      type: GameActionType.PLACE_PIECE,
      payload: slotClicked,
    })
  }

  const updateGameInfo = (newGameInfo: GameInfo) => {
    setGameInfo(newGameInfo)
    playGame()
  }

  useEffect(() => {
    playGame()
  }, [])

  return (
    <div className='Game'>
      <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
      <Board gameInfo={gameInfo} gameState={state} onSlotClick={onSlotClick} />
    </div>
  )
}
