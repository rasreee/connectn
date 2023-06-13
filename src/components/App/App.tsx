import { GameComponent } from 'components/Game'
import { useRootStore } from 'components/RootStoreContext'
import { useIfTruthy } from 'hooks/useIfTruthy'
import useStickyState from 'hooks/useStickyState'
import {
  defaultSettings,
  GameSettings,
  SETTINGS_LOCAL_STORAGE_KEY,
} from 'lib/game'
import { Maybe } from 'lib/types'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { ModalKey } from 'stores/ui.store'

import { SetupModal } from './SetupModal'
import * as S from './styles'

export const App = observer(function App() {
  const { ui, game } = useRootStore()

  const {
    value: persistedSettings,
    set: setPersistedSettings,
    isInitialized,
  } = useStickyState<Maybe<GameSettings>>(null, SETTINGS_LOCAL_STORAGE_KEY)

  const [settings, setSettings] =
    useState<Maybe<GameSettings>>(persistedSettings)

  const shouldUpdateSettings = isInitialized && persistedSettings && !settings
  const shouldSetupGame = isInitialized && settings === null

  useIfTruthy(() => {
    setSettings(persistedSettings)
  }, shouldUpdateSettings)

  useIfTruthy(() => {
    ui.openModal(ModalKey.NewGame)
  }, shouldSetupGame)

  useIfTruthy((settings) => {
    game.initializeWithSettings(settings)
    game.play()
  }, settings)

  const onSubmitGameSettings = (data: GameSettings) => {
    const newPersistedSettings = data.rememberSettings ? data : null
    setPersistedSettings(newPersistedSettings)
    ui.closeModal()
  }

  const onRequestCloseSetupModal = () => {
    if (!settings) return
    ui.closeModal()
  }

  return (
    <S.Container>
      <S.Heading>
        Connect <span className='winNumber'>{game.settings.winNumber}</span>
      </S.Heading>
      {settings && <GameComponent />}
      <SetupModal
        modalToShow={ui.modalToShow}
        onRequestClose={onRequestCloseSetupModal}
        initialSettings={settings ?? defaultSettings}
        onSubmitGameSettings={onSubmitGameSettings}
      />
    </S.Container>
  )
})
