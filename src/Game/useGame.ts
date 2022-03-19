import { GameStep, initializeGameInfo, initializeGameState } from 'lib/game';

import { useGameContext } from './GameContext';

export function useGame() {
  const context = useGameContext();
  const { info, setStep, setInfo, setState } = context;

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo(initializeGameInfo());
    setState(initializeGameState(info));
  }

  return { ...context, resetGame };
}
