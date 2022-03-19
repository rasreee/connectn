import {
  drawGameState,
  notFinishedGameState,
  winningGameStateAcrossBottomHorizontal,
  winningGameStateAcrossLeftVertical,
  winningGameStateDiagonal,
} from './__fixtures__/gameState.fixture';
import { initializeGameInfo } from './gameInfo';
import { computeOutcome, OutcomeType } from './gameOutcome';

describe('computeOutcome', () => {
  it('notFinishedGameState', () => {
    const result = computeOutcome({
      info: initializeGameInfo(),
      state: notFinishedGameState,
    });

    expect(result).toBeNull();
  });

  it('drawGameState', () => {
    const result = computeOutcome({
      info: initializeGameInfo(),
      state: drawGameState,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Draw);
  });

  it('winningGameStateAcrossBottomHorizontal', () => {
    const result = computeOutcome({
      info: initializeGameInfo(),
      state: winningGameStateAcrossBottomHorizontal,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });

  it('winningGameStateAcrossLeftVertical', () => {
    const result = computeOutcome({
      info: initializeGameInfo(),
      state: winningGameStateAcrossLeftVertical,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });

  it('winningGameStateDiagonal', () => {
    const result = computeOutcome({
      info: initializeGameInfo(),
      state: winningGameStateDiagonal,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });
});
