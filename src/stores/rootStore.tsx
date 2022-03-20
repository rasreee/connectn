import { GameInfoStore } from './gameInfo.store';
import { GameStateStore } from './gameState.store';

export class RootStore {
  gameInfo = new GameInfoStore(this);
  gameState = new GameStateStore(this);
}
