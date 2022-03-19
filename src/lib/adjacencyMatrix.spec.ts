import { getAdjacencyKey, initializeAdjacencyMatrix } from './adjacencyMatrix';

/**
 * @group unit
 * @group adjacencyMatrix
 */
describe('lib/adjacencyMatrix', () => {
  it('initializeAdjacencyMatrix()', () => {
    const result = initializeAdjacencyMatrix(2, 2);

    expect(result).toEqual({
      [getAdjacencyKey([0, 0], [0, 1])]: false,
      [getAdjacencyKey([0, 0], [1, 0])]: false,
      [getAdjacencyKey([0, 0], [1, 1])]: false,
      [getAdjacencyKey([0, 1], [0, 0])]: false,
      [getAdjacencyKey([0, 1], [1, 0])]: false,
      [getAdjacencyKey([0, 1], [1, 1])]: false,
      [getAdjacencyKey([1, 0], [0, 0])]: false,
      [getAdjacencyKey([1, 0], [0, 1])]: false,
      [getAdjacencyKey([1, 0], [1, 1])]: false,
      [getAdjacencyKey([1, 1], [0, 0])]: false,
      [getAdjacencyKey([1, 1], [0, 1])]: false,
      [getAdjacencyKey([1, 1], [1, 0])]: false,
    });
  });
});
