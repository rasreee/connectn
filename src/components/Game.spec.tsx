import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { muteConsole } from 'testing/muteConsole'

import { Game } from './Game'

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

    const slot = { column: 0, row: 0 }
    const slotEl = result.getByRole('slot-0-0')
    userEvent.click(slotEl)

    // const pieceEl = result.queryByTestId('piece-0-0')
  })
})
