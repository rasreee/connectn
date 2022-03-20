import './Game.css';

import { Board } from 'components/Board';
import { Onboarding } from 'components/Onboarding';
import { observer } from 'mobx-react-lite';
import { GameStep } from 'models/gameState';
import { useGameInfo, useGameState } from 'stores/hooks';

export const Game = observer(() => {
  const gameInfo = useGameInfo();
  const gameState = useGameState();

  return (
    <div className='Game'>
      <h1 className='Game_heading'>
        <span className='prefix'>Connect </span>
        <span className='winNumber'>{gameInfo.winNumber}</span>
      </h1>
      <div className='Game_onboarding'>
        <Onboarding />
      </div>
      {gameState.currentStep !== GameStep.Onboarding && <Board />}
    </div>
  );
});
