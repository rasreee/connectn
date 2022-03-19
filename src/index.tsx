import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { GameProvider } from './GameContext';

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root')
);
