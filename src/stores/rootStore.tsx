import { GameInfoStore } from './gameInfo.store';
import { GameStateStore } from './gameState.store';

export class RootStore {
  gameState = new GameStateStore(this);
  gameInfo = new GameInfoStore(this);
}
