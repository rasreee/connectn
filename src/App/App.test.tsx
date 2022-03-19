import React from 'react';
import ReactDOM from 'react-dom';

import { GameProvider } from '../Game/GameContext';
import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameProvider>
      <App />
    </GameProvider>,
    div
  );
});
