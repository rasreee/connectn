import { getGameOutcome, OutcomeType } from 'lib/game';
import { useMemo } from 'react';

import { useGame } from '../Game/useGame';

export const BoardInfo = () => {
  const { info, state, resetGame } = useGame();

  const gameOutcome = useMemo(
    () => getGameOutcome({ info, state }),
    [info, state]
  );

  const getPlayerName = (playerIndex: number | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [info.playerOneName, info.playerTwoName][playerIndex!];

  const text = useMemo(() => {
    if (gameOutcome?.type === OutcomeType.Winner)
      return `${getPlayerName(gameOutcome.winner)} is ${OutcomeType.Winner}!`;

    if (gameOutcome?.type === OutcomeType.Draw) return OutcomeType.Draw;

    return `${state.currentPlayerName}'s turn`;
  }, [state, gameOutcome]);

  return (
    <div>
      <div>{text}</div>
      {gameOutcome && <button onClick={resetGame}>New Game</button>}
    </div>
  );
};
