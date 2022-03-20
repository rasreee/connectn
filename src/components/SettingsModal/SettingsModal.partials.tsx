import { Dimensions } from 'models/dimensions';

import styles from './SettingsModal.module.css';

// form for player setup
export const PlayerSetup = ({
  playerOneName,
  playerTwoName,
}: {
  playerOneName: string;
  playerTwoName: string;
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>Who's playing?</div>
      <div className={styles.inputRow}>
        <input type='text' name='playerOneName' defaultValue={playerOneName} />
        <input type='text' name='playerTwoName' defaultValue={playerTwoName} />
      </div>
    </div>
  );
};

// form for board setup
export const BoardSetup = ({
  dimensions,
  winNumber,
}: {
  dimensions: Dimensions;
  winNumber: number;
}) => {
  return (
    <div className={styles.section}>
      <div>
        <div className={styles.sectionTitle}>Board dimensions</div>
        <div>
          <div className={styles.inputRow}>
            <input type='number' name='cols' defaultValue={dimensions.cols} />
            <div className='Onboarding_board_x'>x</div>
            <input type='number' name='rows' defaultValue={dimensions.rows} />
          </div>
        </div>
        <div className={styles.sectionTitle}>How many in a row to win?</div>
        <div className={styles.inputRow}>
          <input type='number' name='winNumber' defaultValue={winNumber} />
        </div>
      </div>
    </div>
  );
};
