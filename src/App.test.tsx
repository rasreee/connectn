import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { RootStoreProvider } from './RootStoreProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RootStoreProvider>
      <App />
    </RootStoreProvider>,
    div
  );
});
