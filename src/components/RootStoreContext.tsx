import { GameModel, GameModelInit } from 'models/game.model'
import { createContext, useContext } from 'react'
import { RootStore } from 'stores/root.store'
import { UiStore } from 'stores/ui.store'

const RootStoreContext = createContext<RootStore>({} as RootStore)

export const useRootStore = () => useContext(RootStoreContext)

let _rootStore: RootStore

export const setupRootStore = (gameInit: GameModelInit): RootStore => {
  if (!_rootStore) {
    const game = new GameModel(gameInit)
    const ui = new UiStore()
    _rootStore = new RootStore(game, ui)
  }

  return _rootStore
}

export const RootStoreProvider: React.FC<{
  gameInit: GameModelInit
}> = ({ children, gameInit }) => {
  _rootStore = setupRootStore(gameInit)

  return (
    <RootStoreContext.Provider value={_rootStore}>
      {children}
    </RootStoreContext.Provider>
  )
}
