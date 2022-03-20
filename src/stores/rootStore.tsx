import { GameInfoStore } from './GameInfoStore';
import { GameStateStore } from './GameStateStore';

export class RootStore {
  gameInfo = new GameInfoStore(this);
  gameState = new GameStateStore(this);
}
