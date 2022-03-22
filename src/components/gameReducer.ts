import { markBoard, Slot } from 'lib/board'
import { createGameState, GameInfo, GameState } from 'lib/game'
import { cloneGrid } from 'lib/grid'
import { getNextPlayer, isPlayer, Player } from 'lib/player'

export enum GameActionType {
  RESET = 'Reset',
  PLAY = 'Play',
  PLACE_PIECE = 'PlacePiece',
}

export type GameAction =
  | { type: GameActionType.RESET; payload: { gameInfo: GameInfo } }
  | { type: GameActionType.PLAY }
  | {
      type: GameActionType.PLACE_PIECE
      payload: Slot
    }

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
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
      console.log(`Request player ${currentPlayer} at (${column}, ${row})`)
      // don't do anything if column is full
      if (state.board[column].every((slot) => isPlayer(slot))) return state

      console.log(`Placing piece at (${column}, ${row})`)

      const nextRow = state.board[column]
        .reverse()
        .findIndex((slot) => !isPlayer(slot))

      const slotToPlacePiece = { column, row: nextRow }

      const newBoard = cloneGrid(board)

      markBoard(board, slotToPlacePiece, currentPlayer)

      const nextPlayer = getNextPlayer(currentPlayer)

      return {
        ...state,
        currentPlayer: nextPlayer,
        board: newBoard,
      }
    }
  }
}
