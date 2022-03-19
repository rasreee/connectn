import { createAdjacencyMap, initializeAdjacencyMap } from './adjacencyMatrix';
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

  it('createAdjacencyMap()', () => {
    const grid = new Grid(2, 2);
    grid.setPoint(0, 0, 'A');
    grid.setPoint(0, 1, 'B');

    const result = createAdjacencyMap(grid);

    expect(result['(0,0)']).toEqual(['(0,1)']);
    expect(result['(0,1)']).toEqual(['(0,0)']);
    Object.entries(result)
      .filter(([key]) => key !== '(0,0)' && key !== '(0,1)')
      .forEach(([_, list]) => {
        expect(list).toHaveLength(0);
      });
  });
});
