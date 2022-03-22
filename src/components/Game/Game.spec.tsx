import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'
import { createGameInfo } from 'lib/game'
import { PlayerColor } from 'lib/player'
import { muteConsole } from 'test-utils/muteConsole'
import { render, screen } from 'test-utils/react'

import { Game } from './Game'

/**
 * @group components/Game
 */
describe('components/Game', () => {
  beforeEach(() => {
    muteConsole()
  })

  it('renders without crashing', () => {
    const gameInfo = createGameInfo({
      columnCount: 2,
      rowCount: 2,
      winNumber: 2,
    })
    render(<Game gameInfo={gameInfo} />)
  })

  it('places piece', () => {
    const gameInfo = createGameInfo({ columnCount: 2, rowCount: 2 })
    const renderResult = render(<Game gameInfo={gameInfo} />)

    // fill up first column
    let slotElement = renderResult.getByRole(`slot-0-0`)
    userEvent.click(slotElement)
    let pieceElement = renderResult.getByRole(`piece-0-0`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)
    slotElement = renderResult.getByRole(`slot-0-1`)
    userEvent.click(slotElement)
    pieceElement = renderResult.getByRole(`piece-0-1`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
    // click same slot again - should stay the same color
    userEvent.click(slotElement)
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)

    // fill up the rest of the board
    slotElement = renderResult.getByRole(`slot-1-0`)
    userEvent.click(slotElement)
    pieceElement = renderResult.getByRole(`piece-1-0`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)

    const gameElement = screen.getByRole('contentinfo')
    // game ends with Player One as winner
    expect(gameElement).toHaveTextContent('Player One is winner')
  })
})
