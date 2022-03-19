import { toCoordsTuple } from './coords';
import { Graph } from './graph';
import { Point } from './point';

/**
 * @group lib
 * @group graph
 */
describe('lib/graph', () => {
  it('initializes', () => {
    const grid = new Graph(2, 2);
    expect(grid.columnCount).toEqual(2);
    expect(grid.rowCount).toEqual(2);
    expect(grid.points.every((point) => point.value === null)).toBeTruthy();
  });

  it('getLinesIncluding()', () => {
    const grid = new Graph(2, 2);
    const target: Point = new Point(1, 0);

    const lines = grid.getLinesIncluding(target);

    expect(lines.length).toEqual(1);
    expect(lines[0].length).toEqual(3);
  });

  it('discoverLine()', () => {
    const grid = new Graph(4, 4);
    const initial = [new Point(0, 0), new Point(1, 0)];
    grid.addPoint(0, 0, 'A');
    grid.addPoint(1, 0, 'B');
    grid.addPoint(2, 0, 'C');
    grid.addPoint(3, 0, 'D');
    const result = grid.discoverLine(initial);
    const coordsTuples = result.map((point) => toCoordsTuple(point.coords));
    expect(coordsTuples).toEqual(
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ].map((coords, index) => new Point(coords[0], coords[1], index))
    );

    grid.clear();
  });
});
