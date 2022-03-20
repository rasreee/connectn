import { Point } from './point';

/**
 * @group lib
 * @group point
 */
describe('utils/point', () => {
  const a = new Point(0, 0);
  const b = new Point(0, 0);
  const c = new Point(1, 1);
  const d = new Point(1, 0);
  const e = new Point(0, 1);
  const f = new Point(2, 1);

  it('point.isEqualTo()', () => {
    expect(a.isEqualTo(b)).toBeTruthy();
    expect(c.isEqualTo(b)).toBeFalsy();
  });

  it('point.isAdjacentTo()', () => {
    expect(a.isAdjacentTo(b)).toBeFalsy();
    expect(a.isAdjacentTo(c)).toBeTruthy();
    expect(a.isAdjacentTo(d)).toBeTruthy();
    expect(a.isAdjacentTo(e)).toBeTruthy();
    expect(a.isAdjacentTo(f)).toBeFalsy();
  });
});
