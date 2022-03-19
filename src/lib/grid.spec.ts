import { Grid } from './grid';

/**
 * @group lib
 * @group grid
 */
describe('lib/grid', () => {
  it('initializes a grid of given size', () => {
    const result = new Grid(2, 2);

    expect(result.columnCount).toEqual(2);
    expect(result.rowCount).toEqual(2);
    expect(result.points.every((point) => point.value === null)).toBeTruthy();
  });

  it('should set value at (column, row)', () => {
    const grid = new Grid(2, 2);

    grid.addPoint(0, 0, 'foo');
    expect(grid.getPoint(0, 0).value).toEqual('foo');

    grid.addPoint(0, 0, null);
    expect(grid.getPoint(0, 0).value).toEqual(null);
  });

  it('should clear grid', () => {
    const grid = new Grid(2, 2);

    grid.addPoint(0, 0, 'foo');
    grid.addPoint(1, 0, 'foo');
    grid.addPoint(0, 1, 'foo');
    grid.addPoint(1, 1, 'foo');

    grid.clear();

    expect(
      grid.data.every((column) => column.every((point) => point.value === null))
    ).toBeTruthy();
  });
});
