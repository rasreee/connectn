import { Slot } from 'lib/board'
import {
  createGameInfo,
  createGameState,
  GameInfo,
  GameState,
  getIsGameActive,
} from 'lib/game'
import { cloneGrid } from 'lib/grid'
import { getNextPlayer, Player } from 'lib/player'
import { useReducer, useState } from 'react'

import { Board } from './Board'
import { Onboarding } from './Onboarding'

enum GameActionType {
  RESET = 'Reset',
  PLAY = 'Play',
  PLACE_PIECE = 'PlacePiece',
}

type GameAction =
  | { type: GameActionType.RESET; payload: { gameInfo: GameInfo } }
  | { type: GameActionType.PLAY }
  | {
      type: GameActionType.PLACE_PIECE
      payload: Slot
    }

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.RESET: {
      const { gameInfo } = action.payload
      return createGameState(gameInfo)
    }
    case GameActionType.PLAY: {
      return { ...state, currentPlayer: Player.PlayerOne }
    }
    case GameActionType.PLACE_PIECE: {
      const { board, currentPlayer } = state
      const { column, row } = action.payload
      console.log(`Request piece at (${column}, ${row})`)

      const newBoard = cloneGrid(board)
      newBoard[column][row] = currentPlayer

      const nextPlayer = getNextPlayer(currentPlayer)

      return {
        ...state,
        currentPlayer: nextPlayer,
        board: newBoard,
      }
    }
  }
}

// Component that holds the structure of the game
export const Game = () => {
  const [gameInfo, setGameInfo] = useState(createGameInfo())
  const [state, dispatch] = useReducer(gameReducer, createGameState(gameInfo))

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
  const placePiece = (slot: Slot) => {
    dispatch({
      type: GameActionType.PLACE_PIECE,
      payload: slot,
    })
  }

  const updateGameInfo = (newGameInfo: GameInfo) => {
    setGameInfo(newGameInfo)
    playGame()
  }

  return (
    <div className='Game'>
      <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
      <div className='Game_onboarding'>
        <Onboarding
          updateGameInfo={updateGameInfo}
          resetGame={resetGame}
          playGame={playGame}
          gameInfo={gameInfo}
        />
      </div>
      {getIsGameActive(state) && (
        <Board gameInfo={gameInfo} gameState={state} placePiece={placePiece} />
      )}
    </div>
  )
}
