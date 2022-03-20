/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Coords } from './coords';
import { createMatrix, Matrix } from './matrix';
import { Point } from './point';

export class Grid<Data = any> {
  data: Matrix<Data>;
  rowCount: number;
  columnCount: number;

  constructor(columnCount: number, rowCount: number) {
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.data = createMatrix<Data>({ width: columnCount, height: rowCount });
  }

  get points(): Point<Data>[] {
    const columns = this.data.map((column) => column);
    return columns.flat();
  }

  areConnected = (a: Coords, b: Coords): boolean => {
    const pointA = this.points.find((item) => item.isAt(a))!;
    const pointB = this.points.find((item) => item.isAt(b))!;

    return (
      Boolean(pointA.value) &&
      Boolean(pointB.value) &&
      pointA.isAdjacentTo(pointB)
    );
  };

  addPoint = (x: number, y: number, value: Data) => {
    const newPoint = new Point(x, y, value);
    this.data[x][y] = newPoint;
  };

  removePoint = (x: number, y: number) => {
    const newPoint = new Point(x, y);
    this.data[x][y] = newPoint;
  };

  getPoint = (x: number, y: number): Point<Data> =>
    this.points.find((point) => point.isAt([x, y]))!;

  clear = () => {
    const data = createMatrix<Data>(this.columnCount, this.rowCount);
    this.data = data;
  };
}
