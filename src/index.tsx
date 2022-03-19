import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameProvider } from './Game/GameContext';
import './index.css';

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root')
);
