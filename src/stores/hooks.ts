import { useStore } from 'lib/mobx/StoreContext';

import { GlobalStore } from './GlobalStore';

const useGlobalStore = () => useStore<GlobalStore>();

export const useGameState = () => useGlobalStore().gameState;
export const useGameInfo = () => useGlobalStore().gameInfo;
