import { initializeGameInfo } from '../lib/game/gameInfo';
import { getGameOutcome, OutcomeType } from '../lib/game/getGameOutcome';
import {
  drawGameState,
  winningGameState,
} from '../__fixtures__/gameState.fixture';

describe('getGameOutcome', () => {
  it('should return Draw outcome', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: drawGameState,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Draw);
  });

  it('should return Winner outcome', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: winningGameState,
    });

    expect(result).not.toBeNull();
    expect(result?.type).toEqual(OutcomeType.Winner);
  });
});
