import { BoardData } from './board'
import { isPlayer, Player } from './player'

export type Outcome =
  | { type: 'win'; winner: Player }
  | { type: 'draw' }
  | { type: 'none' }

export const findWinner = (board: BoardData, winNumber: number): Player => {
  // starting from bottom row, iterate through all lines of length {winNumber} and check if they are all filled.

  return Player.None
}

export const getOutcome = (board: BoardData, winNumber: number): Outcome => {
  const pieces = board
    .map((column) => column.filter((value) => isPlayer(value)))
    .flat()

  const isDraw = pieces.length === board.length * board[0].length
  if (isDraw) return { type: 'draw' }

  const winner = findWinner(board, winNumber)
  if (winner !== Player.None) return { type: 'win', winner }

  return { type: 'none' }
}
