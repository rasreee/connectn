import { useMemo } from 'react';

import { OutcomeType } from './lib/gameOutcome';
import { useGame } from './useGame';

export const BoardInfo = () => {
  const { info, state, outcome, resetGame } = useGame();

  const getPlayerName = (playerIndex: number | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [info.playerOneName, info.playerTwoName][playerIndex!];

  const text = useMemo(() => {
    if (outcome?.type === OutcomeType.Winner)
      return `${getPlayerName(outcome?.winner)} is ${OutcomeType.Winner}!`;

    if (outcome?.type === OutcomeType.Draw) return OutcomeType.Draw;

    return `${state.currentPlayerName}'s turn`;
  }, [state, outcome]);

  return (
    <div>
      <div>{text}</div>
      {outcome && <button onClick={resetGame}>New Game</button>}
    </div>
  );
};
