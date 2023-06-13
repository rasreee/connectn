import { ModalName } from 'components/modals'
import { useRootStore } from 'components/RootStoreContext'
import { MainView } from 'components/views/main'
import { useIfTruthy } from 'hooks/useIfTruthy'
import { FC } from 'react'

import { Providers } from './Providers'
import { useSettings } from './useSettings'

export const App: FC = () => {
  const { ui, game } = useRootStore()

  const { settings, persistedSettings } = useSettings()

  // Show "New Game" view
  useIfTruthy(() => {
    ui.showModal(ModalName.NewGame)
  }, persistedSettings.isInitialized && !settings)

  useIfTruthy((settings) => {
    game.initializeWithSettings(settings)
    game.play()
  }, settings)

  return (
    <Providers>
      <MainView />
    </Providers>
  )
}
