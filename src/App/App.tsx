import React, { useState } from 'react';
import logo from './mark.png';
import './App.css';
import { Instructions } from '../Instruction';
import { Game } from '../Game';

export const App = () => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  function toggleInstructions() {
    setIsInstructionsOpen((prev) => !prev);
  }

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
