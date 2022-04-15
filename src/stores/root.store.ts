import { configure } from 'mobx'

import { GameModel } from '../models/game.model'
import { UiStore } from './ui.store'

// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

export class RootStore {
  constructor(readonly game: GameModel, readonly ui: UiStore) {}
}
