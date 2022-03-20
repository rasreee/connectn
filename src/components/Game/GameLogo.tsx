import { observer } from 'mobx-react-lite';
import { useGameInfo } from 'stores/hooks';

export const GameLogo = observer(function GameLogo() {
  const gameInfo = useGameInfo();

  return (
    <h1 className='Game_heading'>
      <span className='prefix'>Connect </span>
      <span className='winNumber'>{gameInfo.winNumber}</span>
    </h1>
  );
});
