import { Board } from '../Board';
import { Onboarding } from '../Onboarding';
import { GameStep } from './types';
import './Game.css';
import { useGame } from './GameContext';

export const Game = () => {
  const { updateGameInfo, resetGame, playGame, placePiece, step, info, state } =
    useGame();

  /* ~~~~~~~~~~~~~~~~
    Rendering
    ~~~~~~~~~~~~~~~~~ */

  function renderOnboarding() {
    return (
      <div className='Game_onboarding'>
        <Onboarding
          updateGameInfo={updateGameInfo}
          resetGame={resetGame}
          playGame={playGame}
          gameInfo={info}
        />
      </div>
    );
  }

  function maybeRenderBoard() {
    if (step === GameStep.Onboarding) {
      return null;
    }

    return <Board gameInfo={info} gameState={state} placePiece={placePiece} />;
  }

  return (
    <div className='Game'>
      <h1>Let's Play Connect {info.winNumber}!</h1>
      {renderOnboarding()}
      {maybeRenderBoard()}
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
            currentStep: <em>{step}</em>
          </div>
          {Object.keys(info).map((key) => {
            return (
              <div key={key}>
                gameInfo.{key}: <em>{info[key as keyof typeof info]}</em>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
