import { useState } from 'react';
import { Board } from '../Board';
import { Onboarding } from '../Onboarding';
import { DEFAULT_GAME_INFO } from './constants';
import { getNextGameState } from './helpers';
import { GameInfo, GameState, GameStep } from './types';
import './Game.css';

export const Game = () => {
  const initializeGameState = (gameInfo: GameInfo): GameState => ({
    currentPlayerName: gameInfo.playerOneName,
    pieces: [],
  });
  const [state, setState] = useState({
    currentStep: GameStep.Onboarding,
    gameInfo: { ...DEFAULT_GAME_INFO },
    gameState: initializeGameState({ ...DEFAULT_GAME_INFO }),
  });

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  const updateGameInfo = (fieldsToUpdate: Partial<GameInfo>) => {
    const { gameInfo: currentGameInfo } = state;

    setState((prev) => ({
      ...prev,
      gameInfo: { ...currentGameInfo, ...fieldsToUpdate },
    }));
  };

  // returns to blank state
  const resetGame = () => {
    const gameInfo = { ...DEFAULT_GAME_INFO };
    setState((prev) => ({
      ...prev,
      gameInfo,
      currentStep: GameStep.Onboarding,
    }));
  };

  // TODO(1): game state
  // - what needs to happen when the game is started?
  const playGame = () => {
    const { gameInfo } = state;
    setState((prev) => ({
      ...prev,
      currentStep: GameStep.Playing,
      gameState: initializeGameState(gameInfo),
    }));
  };

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  const placePiece = (column: number, row: number) => {
    console.log(`Placing piece at (${column}, ${row})`);
    const { gameState, gameInfo } = state;

    setState((prev) => ({
      ...prev,
      gameState: getNextGameState({
        column,
        gameState,
        gameInfo,
      }),
    }));
  };
  /* ~~~~~~~~~~~~~~~~
    Rendering
    ~~~~~~~~~~~~~~~~~ */

  const renderOnboarding = () => {
    const { gameInfo } = state;

    return (
      <div className='Game_onboarding'>
        <Onboarding
          updateGameInfo={updateGameInfo}
          resetGame={resetGame}
          playGame={playGame}
          gameInfo={gameInfo}
        />
      </div>
    );
  };

  const maybeRenderBoard = () => {
    const { currentStep, gameInfo, gameState } = state;

    if (currentStep === GameStep.Onboarding) {
      return null;
    }

    return (
      <Board
        gameInfo={gameInfo}
        gameState={gameState}
        placePiece={placePiece}
      />
    );
  };

  return (
    <div className='Game'>
      <h1>Let's Play Connect {state.gameInfo.winNumber}!</h1>
      {renderOnboarding()}
      {maybeRenderBoard()}
      <div className='Game_placeholder'>
        <div className='Game_placeholder_top'>
          <p>
            The onboarding steps are setup for you. Use the info collected
            during onboarding to render a board and then start a game.
          </p>
        </div>
        <div className='Game_placeholder_debugger'>
          <label>Debugging Info (remove):</label>
          <div>
            currentStep: <em>{state.currentStep}</em>
          </div>
          {Object.keys(state.gameInfo).map((key) => {
            return (
              <div key={key}>
                gameInfo.{key}:{' '}
                <em>{state.gameInfo[key as keyof typeof state.gameInfo]}</em>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
