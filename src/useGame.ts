import { useMemo } from 'react';

import { useGameContext } from './GameContext';
import { initializeGameInfo } from './lib/gameInfo';
import { computeOutcome } from './lib/gameOutcome';
import { GameState, initializeGameState } from './lib/gameState';
import { GameStep } from './lib/gameStep';
import { logger } from './lib/logger';
import { Piece } from './lib/piece';
import { Slot, slotUtils } from './lib/slot';

export function useGame() {
  const context = useGameContext();
  const { info, state, setStep, setInfo, setState } = context;

  const outcome = useMemo(() => computeOutcome({ info, state }), [info, state]);

  // TODO(2): place piece & check winner
  // - how does the game state change when a piece is placed?
  // - how do you know if a player has won?
  // - you might need to break some of this out into multiple methods or helpers
  function placePiece({ column, row }: Slot) {
    logger.info(`📍 placePiece(column: ${column}, row: ${row})`);

    if (slotUtils.isTaken({ column, row }, state.pieces)) {
      return;
    }

    const nextRow = state.pieces.filter(
      (piece) => piece.slot.column === column
    ).length;

    if (nextRow === info.rowCount) return state;

    const newPiece: Piece = {
      slot: { column, row },
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

  // returns to blank state
  function resetGame() {
    setStep(GameStep.Onboarding);
    setInfo(initializeGameInfo());
    setState(initializeGameState(info));
  }

  return { ...context, outcome, placePiece, resetGame };
}
