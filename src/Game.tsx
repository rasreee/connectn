import './Game.css';

import { Board } from './Board';
import { GameInfo } from './lib/gameInfo';
import { GameStep } from './lib/gameStep';
import { Onboarding } from './Onboarding';
import { useGame } from './useGame';

export const Game = () => {
  const { step, info, setStep, setInfo, resetGame } = useGame();

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  function updateGameInfo(fieldsToUpdate: Partial<GameInfo>) {
    setInfo({ ...info, ...fieldsToUpdate });
  }

  // TODO(1): game state
  // - what needs to happen when the game is started?
  function playGame() {
    setStep(GameStep.Playing);
  }

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

    return <Board />;
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
