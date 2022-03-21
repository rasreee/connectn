import { Grid } from './grid'
import { Player } from './player'

export type Board = Grid<Player>

export interface Slot {
  column: number
  row: number
}

export interface Dimensions {
  columnCount: number
  rowCount: number
}

/**
 * Mutatively sets value at given position of board
 */
export const markBoard = (
  board: Grid<Player>,
  slot: Slot,
  value: Player,
): void => {
  const { column, row } = slot
  board[column][row] = value
}
