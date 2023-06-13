import { Modals } from 'components/modals'
import { useRootStore } from 'components/RootStoreContext'
import { MainView } from 'components/views/main'
import { useIfTruthy } from 'hooks/useIfTruthy'
import { FC } from 'react'

import { Providers } from './Providers'
import { useSettings } from './useSettings'

export const App: FC = () => {
  const { ui, game } = useRootStore()

  const {
    settings,
    setSettings,
    persistedSettings,
    isPersistedSettingsInitialized,
  } = useSettings()

  const shouldUpdateSettings =
    isPersistedSettingsInitialized && persistedSettings && !settings
  const shouldSetupGame = isPersistedSettingsInitialized && !settings

  useIfTruthy(() => {
    setSettings(persistedSettings)
  }, shouldUpdateSettings)

  useIfTruthy(() => {
    ui.openModal(Modals.NewGame)
  }, shouldSetupGame)

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
