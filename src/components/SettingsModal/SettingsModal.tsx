import { Modal } from 'components/Modal';
import { observer } from 'mobx-react-lite';
import { initialGameInfo } from 'models/gameInfo';
import { useRef } from 'react';
import { useGameInfo, useGameState, useUiStore } from 'stores/hooks';
import { classNames } from 'utils/classNames';
import { getFormData } from 'utils/getFormData';

import styles from './SettingsModal.module.css';
import { BoardSetup, PlayerSetup } from './SettingsModal.partials';
export const SettingsModal = observer(function SettingsModal() {
  const uiStore = useUiStore();
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = formRef.current;
    if (!formElement)
      throw new Error('failed to submit form because formRef.current was null');

    const data = getFormData(formElement, initialGameInfo);
    console.log('new gameInfo: ', data);
    gameInfo.updateWith(data);
    gameState.play(data);
    uiStore.setSettingsOpen(false);
  };

  return (
    <Modal
      isOpen={uiStore.isSettingsOpen}
      onClose={() => uiStore.setSettingsOpen(false)}
    >
      <Modal.Header
        title='Game Setup'
        onClose={() => uiStore.setSettingsOpen(false)}
      />
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <PlayerSetup
          playerOneName={gameInfo.playerOneName}
          playerTwoName={gameInfo.playerTwoName}
        />
        <BoardSetup
          {...{
            dimensions: gameInfo.dimensions,
            winNumber: gameInfo.winNumber,
          }}
        />
        <div className={styles.footer}>
          <button
            type='submit'
            className={classNames('button button-primary', styles.submitButton)}
          >
            Start Game
          </button>
        </div>
      </form>
    </Modal>
  );
});
