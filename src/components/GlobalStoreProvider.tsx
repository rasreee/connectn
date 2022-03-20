import { useState } from 'react';
import { GlobalStore } from 'stores/GlobalStore';
import { StoreProvider } from 'utils/mobx/StoreContext';

export const GlobalStoreProvider: React.FC = ({ children }) => {
  const [rootStore] = useState(new GlobalStore());

  return <StoreProvider store={rootStore}>{children}</StoreProvider>;
};
