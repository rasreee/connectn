import { Player } from 'lib/types';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useGameInfo, useGameState } from 'stores/hooks';

export const BoardInfo = observer(() => {
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  const getPlayerName = (playerIndex: number | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [gameInfo.model.playerOneName, gameInfo.model.playerTwoName][playerIndex!];

  const text = computed(() => {
    if (gameState.model.winner !== Player.None)
      return `${getPlayerName(gameState.model.winner)} is Winner!`;

    if (gameState.isDraw) return 'Draw';

    return `${getPlayerName(gameState.model.currentPlayer)}'s turn`;
  }).get();

  return (
    <div>
      <div>{text}</div>
      {gameState.isComplete && (
        <button onClick={gameState.reset}>New Game</button>
      )}
    </div>
  );
});
