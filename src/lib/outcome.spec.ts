import { getOutcome } from './outcome'
import { Player } from './player'

/**
 * @group lib/outcome
 */
describe('lib/outcome', () => {
  it('draw outcome', () => {
    const board = [
      [1, 1],
      [1, 1],
    ]
    const outcome = getOutcome(board, 2)
    expect(outcome).toEqual({ type: 'draw' })
  })

  it('win outcome', () => {
    const board = [
      [1, 1],
      [0, 0],
    ]
    const outcome = getOutcome(board, 2)
    expect(outcome).toEqual({ type: 'win', player: Player.PlayerOne })
  })
})
