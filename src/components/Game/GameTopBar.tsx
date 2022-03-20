import { observer } from 'mobx-react-lite';
import { useGameState } from 'stores/hooks';

import { GameStatusIndicator } from './GameStatusIndicator';
import styles from './GameTopBar.module.css';

export const GameTopBar = observer(() => {
  const gameState = useGameState();

  return (
    <div className={styles.container}>
      <GameStatusIndicator />
      {gameState.winner && (
        <button className='button button-secondary' onClick={gameState.reset}>
          New Game
        </button>
      )}
    </div>
  );
});
