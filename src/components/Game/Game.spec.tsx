import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'
import { createGameInfo } from 'lib/game'
import { PlayerColor } from 'lib/player'
import { muteConsole } from 'test-utils/muteConsole'
import { render } from 'test-utils/react'

import { Game } from './Game'

/**
 * @group components/Game
 */
describe('components/Game', () => {
  beforeEach(() => {
    muteConsole()
  })

  it('renders without crashing', () => {
    const gameInfo = createGameInfo({ columnCount: 2, rowCount: 2 })
    render(<Game gameInfo={gameInfo} />)
  })

  it('places piece', () => {
    const gameInfo = createGameInfo({ columnCount: 2, rowCount: 2 })
    const result = render(<Game gameInfo={gameInfo} />)

    let slotEl = result.getByRole(`slot-0-0`)
    userEvent.click(slotEl)
    let pieceEl = result.getByRole(`piece-0-0`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)

    slotEl = result.getByRole(`slot-0-1`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-0-1`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
    // click same slot again - should stay the same color
    userEvent.click(slotEl)
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)

    // fill up the rest of the board
    slotEl = result.getByRole(`slot-1-0`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-1-0`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)
    slotEl = result.getByRole(`slot-1-1`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-1-1`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
  })
})
