import { useStore } from 'lib/mobx/store-context';

import { RootStore } from './rootStore';

const useRootStore = () => useStore<RootStore>();

export const useGameState = () => useRootStore().gameState;
export const useGameInfo = () => useRootStore().gameInfo;
