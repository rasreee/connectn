import './App.css';

import React, { Component } from 'react';

import { Game } from './Game';
import { Instructions } from './Instructions';
import logo from './mark.png';

interface AppProps {}

interface AppState {
  instructionsOpen: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      instructionsOpen: false,
    };
  }

  toggleInstructions = () => {
    this.setState({ instructionsOpen: !this.state.instructionsOpen });
  };

  render() {
    const { instructionsOpen } = this.state;

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>welcome to the clockwise front-end coding challenge!</h2>
          <p>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          {instructionsOpen && <Instructions />}
          <a
            className='App-instructions'
            onClick={() => this.toggleInstructions()}
          >
            {instructionsOpen ? 'Hide' : 'View'} Detailed Instructions
          </a>
        </div>

        <Game />
      </div>
    );
  }
}

export default App;
