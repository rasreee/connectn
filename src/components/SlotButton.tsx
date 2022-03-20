import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Player } from 'models/player';
import { useGameState } from 'stores/hooks';

export interface SlotButtonProps {
  column: number;
  row: number;
}

export const SlotButton = observer(function SlotButton({
  column,
}: SlotButtonProps) {
  const gameState = useGameState();

  const isDisabled = gameState.winner !== Player.None;
  const handleClick = () => runInAction(() => gameState.placePiece({ column }));

  return (
    <button
      className='Board-Slot'
      disabled={isDisabled}
      onClick={handleClick}
    />
  );
});
