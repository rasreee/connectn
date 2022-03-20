import './App.css';

import React, { useState } from 'react';

import { Game } from './Game';
import { Instructions } from './Instructions';
import logo from './mark.png';

export const App = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const toggleInstructions = () => setIsInstructionsOpen((prev) => !prev);

  return (
    <div className='App'>
      <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h2>welcome to the clockwise front-end coding challenge!</h2>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {isInstructionsOpen && <Instructions />}
        <a className='App-instructions' onClick={() => toggleInstructions()}>
          {isInstructionsOpen ? 'Hide' : 'View'} Detailed Instructions
        </a>
      </div>

      <Game />
    </div>
  );
};
