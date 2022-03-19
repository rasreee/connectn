import { GameInfo } from './gameInfo';
import { GameState } from './gameState';

export interface GameOutcome {}

export const getGameOutcome = (args: {
  info: GameInfo;
  state: GameState;
}): GameOutcome | null => {
  console.log('getGameOutcome()', args);

  return null;
};
