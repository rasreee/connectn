import { Game } from 'components/Game'
import { GameSetupForm } from 'components/GameSetupForm'
import { Modal } from 'components/Modal'
import { defaultGameInfo, GameInfo } from 'lib/game'
import { useState } from 'react'

import { AppProviders } from './AppProviders'

export const App = () => {
  const [initialGameInfo, setInitialGameInfo] = useState<GameInfo | null>(null)

  return (
    <AppProviders>
      {initialGameInfo && <Game gameInfo={initialGameInfo} />}
      <Modal isOpen={!initialGameInfo}>
        <GameSetupForm
          initialGameInfo={initialGameInfo ?? defaultGameInfo}
          onSubmit={setInitialGameInfo}
        />
      </Modal>
    </AppProviders>
  )
}
