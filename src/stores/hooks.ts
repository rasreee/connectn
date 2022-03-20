import { useStore } from 'utils/mobx/StoreContext';

import { GlobalStore } from './GlobalStore';

const useGlobalStore = () => useStore<GlobalStore>();

export const useUiStore = () => useGlobalStore().ui;
export const useGameState = () => useGlobalStore().gameState;
export const useGameInfo = () => useGlobalStore().gameInfo;
