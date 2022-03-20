import { StoreProvider } from 'lib/mobx/store-context';
import { useState } from 'react';
import { GlobalStore } from 'stores/GlobalStore';

export const GlobalStoreProvider: React.FC = ({ children }) => {
  const [rootStore] = useState(new GlobalStore());

  return <StoreProvider store={rootStore}>{children}</StoreProvider>;
};