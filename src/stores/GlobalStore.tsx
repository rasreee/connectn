import { configure } from 'mobx';

import { GameInfoStore } from './GameInfoStore';
import { GameStateStore } from './GameStateStore';
import { UiStore } from './UiStore';

// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

export class GlobalStore {
  ui = new UiStore();
  gameInfo = new GameInfoStore(this);
  gameState = new GameStateStore(this);
}
