import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'
import { muteConsole } from 'testing/muteConsole'
import { render } from 'testing/react'

import { Game } from './Game'

const PLAYER_ONE_COLOR = 'color: red;'
const PLAYER_TWO_COLOR = 'color: black;'

/**
 * @group components
 * @group game
 */
describe('components/Game', () => {
  beforeEach(() => {
    muteConsole()
  })

  it('renders without crashing', () => {
    render(<Game />)
  })

  it('places piece', () => {
    const result = render(<Game />)

    let slotEl = result.getByRole(`slot-0-0`)
    userEvent.click(slotEl)

    let pieceEl = result.getByRole(`piece-0-0`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(PLAYER_ONE_COLOR)

    slotEl = result.getByRole(`slot-1-0`)
    userEvent.click(slotEl)

    pieceEl = result.getByRole(`piece-1-0`)
    expect(pieceEl).toBeVisible()
    expect(pieceEl).toHaveStyle(PLAYER_TWO_COLOR)
  })
})
