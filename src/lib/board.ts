import { GameState } from './game'
import { cloneGrid, createGrid, Grid, setGridSlot } from './grid'
import { getNextPlayer, isPlayer, Player } from './player'

export type BoardData = Grid<Player>

/**
 * Initializes the 2d array representing the game board
 */
export const createBoard = (
  columnCount: number,
  rowCount: number,
): BoardData => {
  return createGrid<Player>(columnCount, rowCount, Player.None)
}

export const getNextRow = (column: Player[]): number | null => {
  if (column.every((value) => isPlayer(value))) return null

  let row = 0

  while (row < column.length && column[row] !== Player.None) {
    row += 1
  }

  return row
}

export const getNextGameState = (
  initialState: GameState,
  column: number,
): GameState => {
  const { board: initialBoard, currentPlayer } = initialState

  const nextRow = getNextRow(initialBoard[column])
  if (nextRow === null) return initialState

  console.log(`Placing player ${currentPlayer} at (${column}, ${nextRow})`)

  let nextBoard = cloneGrid<Player>(initialBoard)
  nextBoard = setGridSlot(nextBoard, column, nextRow, currentPlayer)

  const nextPlayer = getNextPlayer(currentPlayer)
  return { board: nextBoard, currentPlayer: nextPlayer }
}
