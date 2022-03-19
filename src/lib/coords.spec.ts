/**
 * @group coords
 * @group unit
 */

import {
  getCoordsString,
  getCoordsStrings,
  isCoordsString,
  toCoordsObject,
} from './coords';

describe('lib/coords', () => {
  it('isCoordsString()', () => {
    expect(isCoordsString('(0,0)')).toBeTruthy();
    expect(isCoordsString('(11,0)')).toBeTruthy();
  });

  it('toCoordsObject()', () => {
    expect(toCoordsObject('(0,0)')).toEqual({ x: 0, y: 0 });
    expect(toCoordsObject('(11,0)')).toEqual({ x: 11, y: 0 });
  });

  it('getCoordsStrings()', () => {
    const result = getCoordsStrings(2, 2);

    expect(result).toEqual([
      getCoordsString(0, 0),
      getCoordsString(0, 1),
      getCoordsString(1, 0),
      getCoordsString(1, 1),
    ]);
  });
});
