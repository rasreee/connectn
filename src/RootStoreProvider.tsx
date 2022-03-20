import { StoreProvider } from 'lib/mobx/store-context';
import { useState } from 'react';
import { RootStore } from 'stores/rootStore';

export const RootStoreProvider: React.FC = ({ children }) => {
  const [rootStore] = useState(new RootStore());

  return <StoreProvider store={rootStore}>{children}</StoreProvider>;
};
