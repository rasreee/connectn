import React, { Component } from 'react';
import './Game.css';
import { Onboarding } from './Onboarding';
import { Board } from './Board';
import { GameInfo, GameState, GameStep } from './Game.types';
import { DEFAULT_GAME_INFO } from './Game.constants';

interface GameComponentProps {}

interface GameComponentState {
  gameInfo: GameInfo;
  gameState: GameState;
  currentStep: GameStep;
}

// Component that holds the structure of the game
export class Game extends Component<GameComponentProps, GameComponentState> {
  /* ~~~~~~~~~~~~~~~~
    Setup
    ~~~~~~~~~~~~~~~~~ */
  constructor(props: GameComponentProps) {
    super(props);
    const gameInfo = this.initializeGameInfo();
    const gameState = this.initializeGameState(gameInfo);
    this.state = {
      currentStep: GameStep.Onboarding,
      gameInfo,
      gameState,
    };
  }

  /* ~~~~~~~~~~~~~~~~
    Game Info State
    ~~~~~~~~~~~~~~~~~ */
  initializeGameInfo = (): GameInfo => ({ ...DEFAULT_GAME_INFO });

  // TODO(1): game state
  // - what pieces are placed and where? who do they belong to?
  // - whose turn is it?
  initializeGameState = (gameInfo: GameInfo): GameState => ({
    currentPlayerName: gameInfo.playerOneName,
    pieces: [],
  });

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  updateGameInfo = (gameInfo: GameInfo) => {
    this.setState({ gameInfo });
  };

  // returns to blank state
  resetGame = () => {
    const gameInfo = this.initializeGameInfo();
    this.setState({ gameInfo, currentStep: GameStep.Onboarding });
  };

  // TODO(1): game state
  // - what needs to happen when the game is started?
  playGame = () => {
    this.setState({ currentStep: GameStep.Playing });
  };

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  placePiece = (column: number, row: number) => {
    console.log(`Request piece at (${column}, ${row})`);
  };

  /* ~~~~~~~~~~~~~~~~
    Rendering
    ~~~~~~~~~~~~~~~~~ */

  renderOnboarding() {
    const { gameInfo } = this.state;

    return (
      <div className='Game_onboarding'>
        <Onboarding
          updateGameInfo={(gameInfo: GameInfo) => this.updateGameInfo(gameInfo)}
          resetGame={this.resetGame}
          playGame={this.playGame}
          gameInfo={gameInfo}
        />
      </div>
    );
  }

  maybeRenderBoard() {
    const { currentStep, gameInfo, gameState } = this.state;

    if (currentStep === GameStep.Onboarding) {
      return null;
    }

    return (
      <Board
        gameInfo={gameInfo}
        gameState={gameState}
        placePiece={this.placePiece}
      />
    );
  }

  render() {
    const { gameInfo, currentStep } = this.state;

    return (
      <div className='Game'>
        <h1>Let's Play Connect {gameInfo.winNumber}!</h1>
        {this.renderOnboarding()}
        {this.maybeRenderBoard()}
        <div className='Game_placeholder'>
          <div className='Game_placeholder_top'>
            <p>
              The onboarding steps are setup for you. Use the info collected
              during onboarding to render a board and then start a game.
            </p>
          </div>
          <div className='Game_placeholder_debugger'>
            <label>Debugging Info (remove):</label>
            <div>
              currentStep: <em>{currentStep}</em>
            </div>
            {Object.keys(gameInfo).map((key) => {
              return (
                <div key={key}>
                  gameInfo.{key}:{' '}
                  <em>{gameInfo[key as keyof typeof gameInfo]}</em>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}