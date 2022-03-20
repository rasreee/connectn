import { Board } from 'components/Board';

import { ControlPanel } from './ControlPanel';
import styles from './Game.module.css';

export const Game = function Game() {
  return (
    <div className={styles.container}>
      <ControlPanel />
      <Board />
    </div>
  );
};
