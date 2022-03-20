import { configure } from 'mobx';

import { GameInfoStore } from './GameInfoStore';
import { GameStateStore } from './GameStateStore';

// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

export class RootStore {
  gameInfo = new GameInfoStore(this);
  gameState = new GameStateStore(this);
}
