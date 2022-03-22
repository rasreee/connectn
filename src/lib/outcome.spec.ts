import { createPiece } from './board'
import { findWinner, isDrawn } from './outcome'
import { Player } from './player'

/**
 * @group outcome
 */
describe('lib/outcome', () => {
  it('isDrawn()', () => {
    const board = [
      [1, 1],
      [1, 1],
    ]
    expect(isDrawn(board)).toEqual(true)
  })

  it('findWinner()', () => {
    const board = [
      [1, 2],
      [1, 0],
    ]
    const lastPlacedPiece = createPiece(Player.PlayerOne, 1, 0)
    const winNumber = 2
    const outcome = findWinner(board, lastPlacedPiece, winNumber)
    expect(outcome).toEqual({ type: 'win', player: Player.PlayerOne })
  })
})
