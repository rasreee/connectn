import './Game.css';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { GameStep } from 'models/gameState';
import { GameInfoStore } from 'stores/GameInfoStore';
import { useGameInfo, useGameState } from 'stores/hooks';

import { Board } from './Board';
import { Onboarding } from './Onboarding';

export const Game = observer(() => {
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  const stringify = (
    value: GameInfoStore[keyof GameInfoStore]
  ): string | number => {
    if (typeof value === 'string' || typeof value === 'number') return value;

    return `(${value.cols},${value.rows})`;
  };

  return (
    <div className='Game'>
      <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
      <div className='Game_onboarding'>
        <Onboarding />
      </div>
      {gameState.currentStep === GameStep.Onboarding && <Board />}
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
            currentStep: <em>{gameState.currentStep}</em>
          </div>
          {Object.keys(toJS(gameInfo)).map((key) => {
            return (
              <div key={key}>
                gameInfo.{key}:{' '}
                <em>{stringify(gameInfo[key as keyof typeof gameInfo])}</em>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
