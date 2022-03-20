import './Game.css';

import { Board } from 'components/Board';
import { Logo } from 'components/Logo';
import { observer } from 'mobx-react-lite';
import { useGameInfo } from 'stores/hooks';

import { GameTopBar } from './GameTopBar';

export const Game = observer(function Game() {
  const gameInfo = useGameInfo();

  return (
    <div className='Game'>
      <Logo winNumber={gameInfo.winNumber} />
      <GameTopBar />
      <Board />
    </div>
  );
});
