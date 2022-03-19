import { initializeGameInfo } from '../lib/game/gameInfo';
import { getGameOutcome, OutcomeType } from '../lib/game/getGameOutcome';
import {
  drawGameState,
  winningGameStateAcrossBottomHorizontal,
  winningGameStateAcrossLeftVertical,
  winningGameStateDiagonal,
} from '../__fixtures__/gameState.fixture';

describe('getGameOutcome', () => {
  it('drawGameState', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: drawGameState,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Draw);
  });

  it('winningGameStateAcrossBottomHorizontal', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: winningGameStateAcrossBottomHorizontal,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });

  it('winningGameStateAcrossLeftVertical', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: winningGameStateAcrossLeftVertical,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });

  it('winningGameStateDiagonal', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: winningGameStateDiagonal,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });
});
