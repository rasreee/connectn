import { ThemeProvider } from '@emotion/react'
import { Game } from 'components/Game'

import { theme } from './theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Game />
      </div>
    </ThemeProvider>
  )
}
