import { Modals } from 'components/modals'
import { Modal } from 'components/ui/Modal'
import { GameSettings } from 'lib/game'
import { FC } from 'react'

import { SetupForm } from './SetupForm'

const SetupCopy = {
  NewGame: {
    title: 'New Game',
    submitText: 'Start',
  },
  Settings: {
    title: 'Settings',
    submitText: 'Restart',
  },
}

interface SetupModalProps {
  initialSettings: GameSettings
  saveSettings: (data: GameSettings) => void
  onRequestClose: () => void
  modal: Modals | null
}

export const SetupModal: FC<SetupModalProps> = ({
  onRequestClose,
  modal,
  initialSettings,
  saveSettings,
}) => {
  const isOpen = !!modal

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <SetupForm
        title={
          modal === Modals.NewGame
            ? SetupCopy.NewGame.title
            : SetupCopy.Settings.title
        }
        submitButtonText={
          modal === Modals.NewGame
            ? SetupCopy.NewGame.submitText
            : SetupCopy.Settings.submitText
        }
        initialData={initialSettings}
        onSubmit={saveSettings}
      />
    </Modal>
  )
}
