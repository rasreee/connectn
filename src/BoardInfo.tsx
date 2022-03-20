import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { GameOutcome } from 'stores/GameStateStore';
import { useGameInfo, useGameState } from 'stores/hooks';

export const BoardInfo = observer(() => {
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
    <div>
      <div>{text}</div>
      {gameState.winner && <button onClick={gameState.reset}>New Game</button>}
    </div>
  );
});
