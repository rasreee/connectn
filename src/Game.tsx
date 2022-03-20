import './Game.css';

import { useGameInfo, useGameState } from 'stores/hooks';

import { Board } from './Board';
import { GameStep } from './lib/gameStep';
import { Onboarding } from './Onboarding';

export const Game = () => {
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  const renderOnboarding = () => {
    return (
      <div className='Game_onboarding'>
        <Onboarding />
      </div>
    );
  };

  const maybeRenderBoard = () => {
    if (gameState.model.currentStep === GameStep.Onboarding) {
      return null;
    }

    return <Board />;
  };

  return (
    <div className='Game'>
      <h1>Let's Play Connect {gameInfo.model.winNumber}!</h1>
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
            currentStep: <em>{gameState.model.currentStep}</em>
          </div>
          {Object.keys(gameInfo.model).map((key) => {
            return (
              <div key={key}>
                gameInfo.{key}:{' '}
                <em>{gameInfo.model[key as keyof typeof gameInfo.model]}</em>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
