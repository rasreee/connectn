import { BoardData, Piece } from './board'
import { isPlayer, Player } from './player'

export const findWinner = (
  board: BoardData,
  lastPlacedPiece: Piece | null,
  winNumber: number,
): Player => {
  return Player.None
}

export const isDrawn = (board: BoardData): boolean => {
  const pieces = board
    .map((column) => column.filter((value) => isPlayer(value)))
    .flat()

  const columnCount = board.length
  const rowCount = board[0].length

  return pieces.length === columnCount * rowCount
}
