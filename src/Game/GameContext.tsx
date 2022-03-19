import {
  GameStep,
  GameInfo,
  GameState,
  initializeGameInfo,
  Piece,
} from 'lib/game';
import { createContext, useContext, useState } from 'react';

interface IGameContext {
  step: GameStep;
  info: GameInfo;
  state: GameState;
  updateGameInfo: (fieldsToUpdate: Partial<GameInfo>) => void;
  resetGame: () => void;
  playGame: () => void;
  placePiece: (column: number, row: number) => void;
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

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  function updateGameInfo(fieldsToUpdate: Partial<GameInfo>) {
    setInfo({ ...info, ...fieldsToUpdate });
  }

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo(initializeGameInfo());
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

    const nextRow = state.pieces.filter(
      (piece) => piece.column === column
    ).length;

    if (nextRow === info.rowCount) return state;

    const newPiece: Piece = {
      column,
      row: nextRow,
      playerName: state.currentPlayerName,
    };

    const newCurrentPlayerName =
      state.currentPlayerName === info.playerOneName
        ? info.playerTwoName
        : info.playerOneName;

    const nextGameState: GameState = {
      ...state,
      pieces: [...state.pieces, newPiece],
      currentPlayerName: newCurrentPlayerName,
    };

    setState(nextGameState);
  }

  const handlers = { updateGameInfo, resetGame, playGame, placePiece };

  return (
    <GameContext.Provider value={{ step, info, state, ...handlers }}>
      {children}
    </GameContext.Provider>
  );
};
