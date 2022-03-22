import { createGrid, Grid } from './grid'
import { Player } from './player'

export type BoardData = Grid<Player>

export interface Piece {
  placedBy: Player
  column: number
  row: number
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

export const createPiece = (
  placedBy: Player,
  column: number,
  row: number,
): Piece => {
  return { placedBy, column, row }
}
