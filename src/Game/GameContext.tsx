import { GameStep, GameInfo, GameState, initializeGameInfo } from 'lib/game';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IGameContext {
  step: GameStep;
  info: GameInfo;
  state: GameState;
  setStep: Dispatch<SetStateAction<GameStep>>;
  setInfo: Dispatch<SetStateAction<GameInfo>>;
  setState: Dispatch<SetStateAction<GameState>>;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('context was undefined');
  return context;
};

export const GameProvider: React.FC = ({ children }) => {
  function initializeState(gameInfo: GameInfo): GameState {
    return { currentPlayerName: gameInfo.playerOneName, pieces: [] };
  }

  const [step, setStep] = useState(GameStep.Onboarding);
  const [info, setInfo] = useState(initializeGameInfo());
  const [state, setState] = useState(initializeState(info));
  return (
    <GameContext.Provider
      value={{ step, info, state, setStep, setInfo, setState }}
    >
      {children}
    </GameContext.Provider>
  );
};
