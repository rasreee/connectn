import { useSettings } from 'components/app/useSettings'
import { GameComponent } from 'components/Game'
import { useRootStore } from 'components/RootStoreContext'
import { SetupModal } from 'components/setup'
import { useIfTruthy } from 'hooks/useIfTruthy'
import { defaultSettings } from 'lib/game'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { MainHeader } from './header'
import * as S from './MainView.styles'

export const MainView: FC = observer(() => {
  const { ui, game } = useRootStore()

  const { settings, saveSettings } = useSettings()

  useIfTruthy((settings) => {
    game.initializeWithSettings(settings)
    game.play()
  }, settings)

  const closeSetupModal = () => {
    if (!settings) return
    ui.hideModal()
  }

  return (
    <S.Container>
      <MainHeader />
      {settings && <GameComponent />}
      <SetupModal
        modal={ui.modal}
        onClose={closeSetupModal}
        initialSettings={settings ?? defaultSettings}
        onSubmit={saveSettings}
      />
    </S.Container>
  )
})
