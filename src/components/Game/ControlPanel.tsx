import { Circle } from 'components/Circle';
import { observer } from 'mobx-react-lite';
import { getPlayerColor, Player } from 'models/player';
import { useGameInfo } from 'stores/hooks';

import styles from './ControlPanel.module.css';

export const ControlPanel = observer(() => {
  const gameInfo = useGameInfo();

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <div className={styles.playerInfo}>
            <Circle color={getPlayerColor(Player.PlayerOne)} />
            <span>{gameInfo.playerOneName}</span>
          </div>
          <div className={styles.playerInfo}>
            <Circle color={getPlayerColor(Player.PlayerTwo)} />
            <span>{gameInfo.playerTwoName}</span>
          </div>
        </li>
      </ul>
    </div>
  );
});
