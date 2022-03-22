import '@testing-library/jest-dom'

import { createGameInfo, createGameState } from 'lib/game'
import { render } from 'testing/react'

import { Board } from './Board'

/**
 * @group components/Board
 */
describe('components/Board', () => {
  it('renders with correct number of slots', () => {
    const gameInfo = createGameInfo({ columnCount: 2, rowCount: 2 })
    const gameState = createGameState(gameInfo)
    const onSlotClick = jest.fn()

    const board = render(
      <Board
        gameInfo={gameInfo}
        gameState={gameState}
        onSlotClick={onSlotClick}
      />,
    )

    const slot1 = board.getByRole('slot-0-0')
    const slot2 = board.getByRole('slot-1-0')
    const slot3 = board.getByRole('slot-0-1')
    const slot4 = board.getByRole('slot-1-1')

    expect(slot1).toBeVisible()
    expect(slot2).toBeVisible()
    expect(slot3).toBeVisible()
    expect(slot4).toBeVisible()
  })
})
