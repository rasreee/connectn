import { winningGameStateAcrossBottomHorizontal } from './__fixtures__/gameState.fixture';
import { DEFAULT_GAME_INFO } from './gameInfo';
import { getLongestLine, Piece } from './piece';

function filterForPlayer(list: Piece[], targetName: string): Piece[] {
  return list.filter((piece) => piece.playerName === targetName);
}

const alongBottom: Piece[] = filterForPlayer(
  winningGameStateAcrossBottomHorizontal.pieces,
  DEFAULT_GAME_INFO.playerOneName
);

console.table(alongBottom.map((piece) => piece.slot));

describe('lib/piece', () => {
  describe('getLongestLine()', () => {
    it('alongBottom', () => {
      const result = getLongestLine(alongBottom);
      expect(result.length).toEqual(4);
      expect(
        result.map((piece) => [piece.slot.column, piece.slot.row])
      ).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ]);
    });
  });
});
