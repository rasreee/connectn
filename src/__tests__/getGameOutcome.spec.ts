import { initializeGameInfo } from '../lib/game/gameInfo';
import { getGameOutcome, OutcomeType } from '../lib/game/getGameOutcome';

const winningGameState = {
  currentPlayerName: 'Player Two',
  pieces: [
    {
      column: 2,
      row: 0,
      playerName: 'Player One',
    },
    {
      column: 4,
      row: 0,
      playerName: 'Player Two',
    },
    {
      column: 3,
      row: 0,
      playerName: 'Player One',
    },
    {
      column: 1,
      row: 0,
      playerName: 'Player Two',
    },
    {
      column: 1,
      row: 1,
      playerName: 'Player One',
    },
    {
      column: 0,
      row: 0,
      playerName: 'Player Two',
    },
    {
      column: 0,
      row: 1,
      playerName: 'Player One',
    },
    {
      column: 5,
      row: 0,
      playerName: 'Player Two',
    },
    {
      column: 3,
      row: 1,
      playerName: 'Player One',
    },
    {
      column: 6,
      row: 0,
      playerName: 'Player Two',
    },
    {
      column: 2,
      row: 1,
      playerName: 'Player One',
    },
  ],
};

describe('getGameOutcome', () => {
  it('should return winning outcome', () => {
    const result = getGameOutcome({
      info: initializeGameInfo(),
      state: winningGameState,
    });

    expect(result?.type).toEqual(OutcomeType.Winner);
  });
});
