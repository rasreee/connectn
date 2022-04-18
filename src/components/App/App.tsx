import { css } from '@emotion/react'
import styled from '@emotion/styled'
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
  useIfTruthy(() => {
    setSettings(persistedSettings)
  }, shouldUpdateSettings)

  const shouldSetupGame = isInitialized && settings === null
  useIfTruthy(() => {
    ui.openModal(ModalKey.NewGame)
  }, shouldSetupGame)

  useIfTruthy((settings) => {
    game.initializeWithSettings(settings)
    game.play()
  }, settings)

  const onSubmitGameSettings = (data: GameSettings) => {
    if (data.rememberSettings) {
      setPersistedSettings(data)
    } else if (persistedSettings) {
      setPersistedSettings(null)
    }
    setSettings(data)
    ui.closeModal()
  }

  const onRequestCloseSetupModal = () => {
    settings && ui.closeModal()
  }

  return (
    <Container>
      <Heading>
        Connect <span className='winNumber'>{game.settings.winNumber}</span>
      </Heading>
      {settings && <GameComponent />}
      <SetupModal
        modalToShow={ui.modalToShow}
        onRequestClose={onRequestCloseSetupModal}
        initialSettings={settings ?? defaultSettings}
        onSubmitGameSettings={onSubmitGameSettings}
      />
    </Container>
  )
})

const Container = styled.div(
  css`
    flex: 1;
    max-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    gap: 1.25rem;
    margin: 0 auto;
    padding: 2rem 0;
  `,
)

const Heading = styled.h1(
  ({ theme }) => css`
    text-transform: uppercase;
    color: ${theme.colors.primary[600]};
    font-weight: ${theme.fontWeights.extrabold};

    & span.winNumber {
      color: ${theme.colors.red[500]};
      font-weight: ${theme.fontWeights.extrabold};
    }
  `,
)
