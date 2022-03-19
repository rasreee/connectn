import { useMemo } from 'react';

import { useGameContext } from './GameContext';
import { initializeGameInfo } from './lib/gameInfo';
import { computeOutcome } from './lib/gameOutcome';
import { initializeGameState } from './lib/gameState';
import { GameStep } from './lib/gameStep';

export function useGame() {
  const context = useGameContext();
  const { info, state, setStep, setInfo, setState } = context;

  const outcome = useMemo(() => computeOutcome({ info, state }), [info, state]);

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo(initializeGameInfo());
    setState(initializeGameState(info));
  }

  return { ...context, outcome, resetGame };
}
