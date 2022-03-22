import { cloneGrid, createGrid, Grid } from './grid'
import { isPlayer, Player } from './player'

export type BoardData = Grid<Player>

export interface Slot {
  column: number
  row: number
}

export interface Dimensions {
  columnCount: number
  rowCount: number
}

/**
 * Initializes the 2d array representing the game board
 */
export const createBoard = (
  columnCount: number,
  rowCount: number,
): BoardData => {
  return createGrid<Player>(columnCount, rowCount, Player.None)
}

/**
 * Mutatively sets value at given position of board
 */
export const markBoard = (
  board: BoardData,
  slot: Slot,
  value: Player,
): BoardData => {
  const { column, row } = slot
  const newBoard = cloneGrid(board)
  newBoard[column][row] = value
  console.log('BOARD: ' + newBoard)
  return newBoard
}

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
  currentPlayer: Player,
): BoardData => {
  const nextRow = getNextRow(initialBoard[column])
  if (nextRow === null) return initialBoard

  const slotToPlacePiece = { column, row: nextRow }
  console.log(`Placing piece at (${column}, ${nextRow})`)

  let nextBoard = cloneGrid<Player>(initialBoard)

  nextBoard = markBoard(nextBoard, slotToPlacePiece, currentPlayer)

  return nextBoard
}
