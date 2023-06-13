import { ModalName } from 'components/modals'
import { Modal } from 'components/ui/Modal'
import { GameSettings } from 'lib/game'
import { FC } from 'react'

import { SetupForm } from './SetupForm'

const Copy = {
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
  onSubmit: (data: GameSettings) => void
  onClose: () => void
  modal: ModalName | null
}

export const SetupModal: FC<SetupModalProps> = ({
  onClose,
  modal,
  initialSettings,
  onSubmit,
}) => {
  const isOpen = !!modal
  const copy = modal === ModalName.NewGame ? Copy.NewGame : Copy.Settings

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SetupForm
        title={copy.title}
        submitButtonText={copy.submitText}
        initialData={initialSettings}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
