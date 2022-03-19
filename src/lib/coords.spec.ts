/**
 * @group grid
 * @group unit
 */

import { getCoordsString, getCoordsStrings } from './coords';

describe('lib/coords', () => {
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
