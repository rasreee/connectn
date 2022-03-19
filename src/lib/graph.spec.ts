import { toCoordsTuple } from './coords';
import { Graph } from './graph';
import { Point } from './point';

/**
 * @group lib
 * @group graph
 */
describe('lib/graph', () => {
  let grid = new Graph(4, 4);
  beforeEach(() => {
    grid = new Graph(4, 4);
    grid.addPoint(0, 0, 'A');
    grid.addPoint(1, 0, 'B');
    grid.addPoint(2, 0, 'C');
    grid.addPoint(3, 0, 'D');
  });

  it('initializes', () => {
    const result = new Graph(2, 2);
    expect(result.columnCount).toEqual(2);
    expect(result.rowCount).toEqual(2);
    expect(result.points.every((point) => point.value === null)).toBeTruthy();
  });

  it('getLongestLine()', () => {
    const line = grid.getLongestLine();
    expect(line.length).toEqual(4);
  });

  it('discoverLine()', () => {
    const initial = [new Point(0, 0), new Point(1, 0)];
    const result = grid.discoverLine(initial);
    const coordsTuples = result.map((point) => toCoordsTuple(point.coords));
    expect(coordsTuples).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });
});
