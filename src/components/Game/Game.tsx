import { Board } from 'components/Board';
import { observer } from 'mobx-react-lite';
import { GameStep } from 'models/gameState';
import { SVGProps } from 'react';
import { useGameState, useUiStore } from 'stores/hooks';

import styles from './Game.module.css';
import { GameStatusIndicator } from './GameStatusIndicator';

export const AdjustmentsIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='icon'
      {...props}
    >
      <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z' />
    </svg>
  );
};

export const Game = observer(function Game() {
  const uiState = useUiStore();
  const gameState = useGameState();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GameStatusIndicator />
        <div className={styles.headerRight}>
          <button
            className={
              gameState.currentStep === GameStep.Playing
                ? 'button button-ghost'
                : 'hidden'
            }
            disabled={gameState.currentStep !== GameStep.Playing}
          >
            New Game
          </button>
          <button
            className='button button-circular button-ghost'
            onClick={() => uiState.setSettingsOpen(true)}
          >
            <AdjustmentsIcon />
          </button>
        </div>
      </div>
      <Board />
    </div>
  );
});
