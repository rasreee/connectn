import { ThemeProvider } from '@emotion/react'
import { Game } from 'components/Game'
import { GameSetupForm } from 'components/GameSetupForm'
import { Modal } from 'components/Modal'
import { defaultGameInfo, GameInfo } from 'lib/game'
import { useState } from 'react'

import { theme } from './theme'

export const App = () => {
  const [initialGameInfo, setInitialGameInfo] = useState<GameInfo | null>(null)

  return (
    <ThemeProvider theme={theme}>
      {initialGameInfo && <Game gameInfo={initialGameInfo} />}
      <Modal isOpen={!initialGameInfo}>
        <GameSetupForm
          initialGameInfo={defaultGameInfo}
          onSubmit={setInitialGameInfo}
        />
      </Modal>
    </ThemeProvider>
  )
}
