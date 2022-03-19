import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { GameProvider } from './GameContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameProvider>
      <App />
    </GameProvider>,
    div
  );
});
