import { Modal } from 'components/Modal'
import { SetupForm } from 'components/SetupForm'
import { GameSettings } from 'lib/game'
import { Maybe } from 'lib/types'
import { ModalKey, ModalKeyType } from 'stores/ui.store'

export const SetupModal = ({
  onRequestClose,
  modalToShow,
  initialSettings,
  onSubmitGameSettings,
}: {
  initialSettings: GameSettings
  onSubmitGameSettings: (data: GameSettings) => void
  onRequestClose: () => void
  modalToShow: Maybe<ModalKeyType>
}) => {
  return (
    <Modal
      isOpen={([ModalKey.NewGame, ModalKey.Settings] as any[]).includes(
        modalToShow,
      )}
      onRequestClose={onRequestClose}
    >
      <SetupForm
        title={modalToShow === 'NewGame' ? 'New Game' : 'Settings'}
        submitButtonText={
          modalToShow === 'NewGame' ? 'Start Game' : 'Restart Game'
        }
        initialData={initialSettings}
        onSubmit={onSubmitGameSettings}
      />
    </Modal>
  )
}
