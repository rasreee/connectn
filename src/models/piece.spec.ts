import { Piece } from './piece';

/**
 * @group lib
 * @group piece
 */
describe('utils/piece', () => {
  const a = new Piece(0, 0);
  const b = new Piece(0, 0);
  const c = new Piece(1, 1);
  const d = new Piece(1, 0);
  const e = new Piece(0, 1);
  const f = new Piece(2, 1);

  it('piece.isEqualTo()', () => {
    expect(a.isEqualTo(b)).toBeTruthy();
    expect(c.isEqualTo(b)).toBeFalsy();
  });

  it('piece.isAdjacentTo()', () => {
    expect(a.isAdjacentTo(b)).toBeFalsy();
    expect(a.isAdjacentTo(c)).toBeTruthy();
    expect(a.isAdjacentTo(d)).toBeTruthy();
    expect(a.isAdjacentTo(e)).toBeTruthy();
    expect(a.isAdjacentTo(f)).toBeFalsy();
  });
});
