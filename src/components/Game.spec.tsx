import { render } from '@testing-library/react'

import { Game } from './Game'

/**
 * @group components
 * @group game
 */
describe('components/Game', () => {
  it('renders', () => {
    render(<Game />)
  })
})
