import { BoardData, createPiece } from 'lib/board'
import { GameState } from 'lib/game'
import { cloneGrid, setGridSlot } from 'lib/grid'
import { getNextPlayer, isPlayer, Player } from 'lib/player'

export const getNextRow = (column: Player[]): number | null => {
  if (column.every((value) => isPlayer(value))) return null

  let row = 0

  while (row < column.length && column[row] !== Player.None) {
    row += 1
  }

  return row
}

export const getNextBoard = (
  initialBoard: BoardData,
  column: number,
  row: number,
  currentPlayer: Player,
): BoardData => {
  console.log(`Placing player ${currentPlayer} at (${column}, ${row})`)

  let nextBoard = cloneGrid<Player>(initialBoard)
  nextBoard = setGridSlot(nextBoard, column, row, currentPlayer)

  return nextBoard
}

export const getNextGameState = (
  initialState: GameState,
  winNumber: number,
  column: number,
): GameState => {
  const nextRow = getNextRow(initialState.board[column])
  if (nextRow === null) return initialState

  const nextBoard = getNextBoard(
    initialState.board,
    column,
    nextRow,
    initialState.currentPlayer,
  )

  const nextPlayer = getNextPlayer(initialState.currentPlayer)

  const lastPlacedPiece = createPiece(
    initialState.currentPlayer,
    column,
    nextRow,
  )

  return {
    board: nextBoard,
    currentPlayer: nextPlayer,
    lastPlacedPiece,
  }
}
