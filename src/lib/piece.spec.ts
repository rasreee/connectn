import { winningGameStateAcrossBottomHorizontal } from './__fixtures__/gameState.fixture';
import { DEFAULT_GAME_INFO } from './gameInfo';
import {
  createPiece,
  getAdjacentPieces,
  getLinesIncluding,
  getLongestLine,
  Piece,
} from './piece';

function filterForPlayer(list: Piece[], targetName: string): Piece[] {
  return list.filter((piece) => piece.playerName === targetName);
}

const alongBottom: Piece[] = filterForPlayer(
  winningGameStateAcrossBottomHorizontal.pieces,
  DEFAULT_GAME_INFO.playerOneName
);

console.table(alongBottom.map((piece) => piece.slot));

/**
 * @group piece
 */
describe('lib/piece', () => {
  it('getAdjacentPieces', () => {
    const target: Piece = createPiece([0, 0]);
    const adjacents: Piece[] = [
      createPiece([1, 0]),
      createPiece([0, 1]),
      createPiece([1, 1]),
    ];
    const list: Piece[] = [createPiece([2, 0]), ...adjacents];

    const result = getAdjacentPieces(target, list);

    expect(result.length).toEqual(3);
    expect(result).toEqual(adjacents);
  });

  it.only('getLinesIncluding', () => {
    const target: Piece = createPiece([0, 0]);
    const list: Piece[] = [createPiece([1, 0]), createPiece([2, 0])];

    const result = getLinesIncluding(target, list);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(list);
  });

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
