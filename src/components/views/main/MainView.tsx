import { useSettings } from 'components/app/useSettings'
import { GameComponent } from 'components/Game'
import { Modals } from 'components/modals'
import { useRootStore } from 'components/RootStoreContext'
import { SetupModal } from 'components/setup'
import { useIfTruthy } from 'hooks/useIfTruthy'
import { defaultSettings } from 'lib/game'
import { Observer } from 'mobx-react-lite'
import { FC } from 'react'

import { MainHeader } from './header'
import * as S from './MainView.styles'

export const MainView: FC = () => {
  const { ui, game } = useRootStore()

  const {
    settings,
    setSettings,
    persistedSettings,
    isPersistedSettingsInitialized,
    saveSettings,
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

  const closeSetupModal = () => {
    if (!settings) return
    ui.closeModal()
  }

  return (
    <S.Container>
      <MainHeader />
      {settings && <GameComponent />}
      <Observer>
        {() => (
          <SetupModal
            modal={ui.modal}
            onRequestClose={closeSetupModal}
            initialSettings={settings ?? defaultSettings}
            saveSettings={saveSettings}
          />
        )}
      </Observer>
    </S.Container>
  )
}
