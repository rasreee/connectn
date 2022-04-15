import userEvent from '@testing-library/user-event'
import { Providers } from 'components/App/Providers'
import { GameInfo, GameStatus, PlayerColor } from 'lib/game'
import { GameModelInit } from 'models/game.model'
import { defaultRender, screen } from 'test-utils/react'

import { GameComponent } from './Game.component'

const renderGame = (
  gameInfo: Partial<GameInfo> = {},
  gameInit: GameModelInit = {},
) => {
  const game = defaultRender(
    <Providers gameInit={{ ...gameInfo, ...gameInit }}>
      <GameComponent />
    </Providers>,
  )

  return game
}

/**
 * @group components
 * @group game
 */
describe('components/Game', () => {
  it('renders with correct dimensions', () => {
    const game = renderGame(
      {
        columnCount: 2,
        rowCount: 2,
        winNumber: 2,
      },
      { currentPlayer: 1, status: GameStatus.InProgress },
    )

    const slot1 = game.getByRole('Slot-0-0')
    const slot2 = game.getByRole('Slot-1-0')
    const slot3 = game.getByRole('Slot-0-1')
    const slot4 = game.getByRole('Slot-1-1')

    expect(slot1).toBeVisible()
    expect(slot2).toBeVisible()
    expect(slot3).toBeVisible()
    expect(slot4).toBeVisible()
  })

  it('places piece', () => {
    const renderResult = renderGame(
      { columnCount: 2, rowCount: 2 },
      { currentPlayer: 1, status: GameStatus.InProgress },
    )

    // fill up first x
    let slotElement = renderResult.getByRole(`Slot-0-0`)
    userEvent.click(slotElement)
    let pieceElement = renderResult.getByRole(`Piece-0-0`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)
    slotElement = renderResult.getByRole(`Slot-0-1`)
    userEvent.click(slotElement)
    pieceElement = renderResult.getByRole(`Piece-0-1`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)
    // click same slot again - should stay the same color
    userEvent.click(slotElement)
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerTwo};`)

    // fill up the rest of the board
    slotElement = renderResult.getByRole(`Slot-1-0`)
    userEvent.click(slotElement)
    pieceElement = renderResult.getByRole(`Piece-1-0`)
    expect(pieceElement).toBeVisible()
    expect(pieceElement).toHaveStyle(`color: ${PlayerColor.PlayerOne};`)

    const gameElement = screen.getByRole('contentinfo')
    // game ends with Player One as winner
    expect(gameElement).toHaveTextContent('Player One is winner')
  })
})
