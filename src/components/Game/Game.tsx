import './Game.css';

import { Board } from 'components/Board';
import { Onboarding } from 'components/Onboarding';

import { GameLogo } from './GameLogo';

export const Game = () => {
  return (
    <div className='Game'>
      <GameLogo />
      <Onboarding />
      <Board />
    </div>
  );
};
