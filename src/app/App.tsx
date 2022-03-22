import { ThemeProvider } from '@emotion/react'
import { Game } from 'components/Game'
import { GameProvider } from 'game/GameProvider'

import { theme } from './theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <div className='App'>
          <Game />
        </div>
      </GameProvider>
    </ThemeProvider>
  )
}
