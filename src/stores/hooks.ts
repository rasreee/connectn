import { useStore } from 'lib/mobx/store-context';

import { GlobalStore } from './GlobalStore';

const useGlobalStore = () => useStore<GlobalStore>();

export const useGameState = () => useGlobalStore().gameState;
export const useGameInfo = () => useGlobalStore().gameInfo;
