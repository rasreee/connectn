import { useMemo } from 'react';
import { GameInfo, GameState } from '../Game/types';

export interface BoardInfoProps {
  gameInfo: GameInfo;
  gameState: GameState;
}

export const BoardInfo = ({ gameState }: BoardInfoProps) => {
  const text = useMemo(() => {
    return `${gameState.currentPlayerName}'s turn`;
  }, [gameState]);

  return (
    <div>
      <div>{text}</div>
    </div>
  );
};
