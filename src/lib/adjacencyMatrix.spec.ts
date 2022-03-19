import { initializeAdjacencyMap } from './adjacencyMatrix';
import { toCoordsString } from './coords';
import { Grid } from './grid';

/**
 * @group unit
 * @group adjacencyMatrix
 */
describe('lib/adjacencyMatrix', () => {
  it('initializeAdjacencyMap()', () => {
    const result = initializeAdjacencyMap(2, 2);

    expect(result).toEqual({
      [toCoordsString([0, 0])]: [],
      [toCoordsString([0, 1])]: [],
      [toCoordsString([1, 0])]: [],
      [toCoordsString([1, 1])]: [],
    });
  });

  it('AdjacencyMatrix', () => {
    const grid = new Grid(2, 2);
    grid.addPoint(0, 0, 'A');
    grid.addPoint(0, 1, 'B');

    expect(grid.areConnected('(0,0)', '(0,1)')).toBeTruthy();
    expect(grid.areConnected('(0,0)', '(1,1)')).toBeFalsy();

    grid.clear();
    expect(grid.areConnected('(0,0)', '(0,1)')).toBeFalsy();
  });
});
