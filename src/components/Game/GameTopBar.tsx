import './GameTopBar.css';

import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { GameOutcome } from 'models/gameState';
import { useGameInfo, useGameState } from 'stores/hooks';

export const GameStatus = observer(function GameStatus() {
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
    <div className='GameStatus'>
      <div className='text'>{text}</div>
    </div>
  );
});

export const GameTopBar = observer(() => {
  const gameState = useGameState();

  return (
    <div className='GameTopBar'>
      <GameStatus />
      {gameState.winner && <button onClick={gameState.reset}>New Game</button>}
    </div>
  );
});
