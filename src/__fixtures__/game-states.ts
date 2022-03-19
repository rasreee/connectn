import { GameState } from 'lib/game/gameState';

export const winningGameState: GameState = {
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
