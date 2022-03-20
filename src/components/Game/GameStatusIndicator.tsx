import { Circle } from 'components/Circle';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { GameOutcome } from 'models/gameState';
import { getPlayerColor } from 'models/player';
import { useGameInfo, useGameState } from 'stores/hooks';

import styles from './GameStatusIndicator.module.css';

export const GameStatusIndicator = observer(function GameStatusIndicator() {
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  const getPlayerName = (playerIndex: number | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [gameInfo.playerOneName, gameInfo.playerTwoName][playerIndex!];

  const text = computed(() => {
    switch (gameState.outcome) {
      case GameOutcome.Draw:
        return 'Draw';
      case GameOutcome.Win:
        return `${getPlayerName(gameState.winner)} is Winner!`;
      default:
        return `${getPlayerName(gameState.currentPlayer)}'s turn`;
    }
  }).get();

  return (
    <div className={styles.container}>
      <Circle color={getPlayerColor(gameState.currentPlayer)} />
      <span className={styles.text}>{text}</span>
    </div>
  );
});
