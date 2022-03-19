import { useGame } from 'Game/GameContext';
import { getGameOutcome, OutcomeType } from 'lib/game';
import { useMemo } from 'react';

export const BoardInfo = () => {
  const { info, state } = useGame();

  const getPlayerName = (playerIndex: number | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [info.playerOneName, info.playerTwoName][playerIndex!];

  const text = useMemo(() => {
    const outcome = getGameOutcome({ info, state });

    if (outcome?.type === OutcomeType.Winner)
      return `${getPlayerName(outcome.winner)} is ${OutcomeType.Winner}!`;

    if (outcome?.type === OutcomeType.Draw) return OutcomeType.Draw;

    return `${state.currentPlayerName}'s turn`;
  }, [state, info]);

  return (
    <div>
      <div>{text}</div>
    </div>
  );
};
