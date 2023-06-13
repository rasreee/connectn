import React from 'react'
import { render } from 'test-utils/react'

import { App } from './App'
import { Providers } from './Providers'

it('renders without crashing', () => {
  render(
    <Providers>
      <App />
    </Providers>,
  )
})
