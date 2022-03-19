import {
  GameInfo,
  GameState,
  GameStep,
  initializeGameInfo,
  initializeGameState,
  Piece,
} from 'lib/game';
import { Board } from '../Board';
import { Onboarding } from '../Onboarding';
import { useGame } from './GameContext';
import './Game.css';

export const Game = () => {
  const { step, info, state, setStep, setInfo, setState } = useGame();

  // TODO(1): game state
  // - what needs to happen to the game state if game info changes?
  function updateGameInfo(fieldsToUpdate: Partial<GameInfo>) {
    setInfo({ ...info, ...fieldsToUpdate });
  }

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo(initializeGameInfo());
    setState(initializeGameState(info));
  }

  // TODO(1): game state
  // - what needs to happen when the game is started?
  function playGame() {
    setStep(GameStep.Playing);
  }

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  function placePiece(column: number, row: number) {
    console.log(`Placing piece at (${column}, ${row})`);

    const nextRow = state.pieces.filter(
      (piece) => piece.column === column
    ).length;

    if (nextRow === info.rowCount) return state;

    const newPiece: Piece = {
      column,
      row: nextRow,
      playerName: state.currentPlayerName,
    };

    const newCurrentPlayerName =
      state.currentPlayerName === info.playerOneName
        ? info.playerTwoName
        : info.playerOneName;

    const nextGameState: GameState = {
      ...state,
      pieces: [...state.pieces, newPiece],
      currentPlayerName: newCurrentPlayerName,
    };

    setState(nextGameState);
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
