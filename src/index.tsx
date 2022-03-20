import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { RootStoreProvider } from './RootStoreProvider';

ReactDOM.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById('root')
);
