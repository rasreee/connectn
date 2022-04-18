import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GameComponent } from 'components/Game'
import { useRootStore } from 'components/RootStoreContext'
import useStickyState from 'hooks/useStickyState'
import {
  defaultSettings,
  GameSettings,
  SETTINGS_LOCAL_STORAGE_KEY,
} from 'lib/game'
import { Maybe } from 'lib/types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { ModalKey } from 'stores/ui.store'

import { SetupModal } from './SetupModal'

export const App = observer(function App() {
  const { ui, game } = useRootStore()

  const [initialSettings, setInitialSettings] =
    useState<Maybe<GameSettings>>(null)

  const [persistedSettings, setPersistedSettings] = useStickyState<
    Maybe<GameSettings>
  >(null, SETTINGS_LOCAL_STORAGE_KEY)

  useEffect(() => {
    ui.openModal(ModalKey.NewGame)
  }, [])

  const onSubmitGameSettings = (data: GameSettings) => {
    if (data.rememberSettings) {
      setPersistedSettings(data)
    } else if (persistedSettings) {
      setPersistedSettings(null)
    }
    setInitialSettings(data)
    game.initializeWithSettings(data)
    game.play()
    ui.closeModal()
  }

  const onRequestCloseSetupModal = () => {
    initialSettings && ui.closeModal()
  }

  return (
    <Container>
      <Heading>
        Connect <span className='winNumber'>{game.settings.winNumber}</span>
      </Heading>
      {initialSettings && <GameComponent />}
      <SetupModal
        modalToShow={ui.modalToShow}
        onRequestClose={onRequestCloseSetupModal}
        initialSettings={initialSettings ?? defaultSettings}
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
