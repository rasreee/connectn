import { createContext, useContext, useState } from 'react';
import { DEFAULT_GAME_INFO } from './constants';
import { getNextGameState } from './helpers';
import { GameInfo, GameState, GameStep } from './types';

interface IGameContext {
  step: GameStep;
  info: GameInfo;
  state: GameState;
  updateGameInfo: (fieldsToUpdate: Partial<GameInfo>) => void;
  resetGame: () => void;
  playGame: () => void;
  placePiece: (column: number, row: number) => void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  function initializeState(gameInfo: GameInfo): GameState {
    return { currentPlayerName: gameInfo.playerOneName, pieces: [] };
  }

  const [step, setStep] = useState(GameStep.Onboarding);
  const [info, setInfo] = useState({ ...DEFAULT_GAME_INFO });
  const [state, setState] = useState(initializeState(info));

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  function updateGameInfo(fieldsToUpdate: Partial<GameInfo>) {
    setInfo({ ...info, ...fieldsToUpdate });
  }

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo({ ...DEFAULT_GAME_INFO });
    setState(initializeState(info));
  }

  // TODO(1): game state
  // - what needs to happen when the game is started?
  function playGame() {
    setStep(GameStep.Playing);
  }

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  function placePiece(column: number, row: number) {
    console.log(`Placing piece at (${column}, ${row})`);

    setState(
      getNextGameState({
        column,
        state,
        info,
      })
    );
  }

  const handlers = { updateGameInfo, resetGame, playGame, placePiece };

  return (
    <GameContext.Provider value={{ step, info, state, ...handlers }}>
      {children}
    </GameContext.Provider>
  );
};
