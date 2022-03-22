import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'
import { createGameInfo } from 'lib/game'
import { PlayerColor } from 'lib/player'
import { muteConsole } from 'testing/muteConsole'
import { render } from 'testing/react'

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

    slotEl = result.getByRole(`slot-1-0`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-1-0`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)

    slotEl = result.getByRole(`slot-0-1`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-0-1`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)

    slotEl = result.getByRole(`slot-1-1`)
    userEvent.click(slotEl)
    pieceEl = result.getByRole(`piece-1-1`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
  })

  describe('given column is full and column is clicked', () => {
    it('should remain the same', () => {
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

      slotEl = result.getByRole(`slot-0-0`)
      userEvent.click(slotEl)
      pieceEl = result.getByRole(`piece-0-0`)
      expect(pieceEl).toBeVisible()
      expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)
      pieceEl = result.getByRole(`piece-0-1`)
      expect(pieceEl).toBeVisible()
      expect(pieceEl).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
    })
  })
})
