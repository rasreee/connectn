import times from 'lodash.times';

import { Point } from './point';

export type Matrix<Data = any> = Point<Data>[][];

export type MatrixValues<Data = any> = (Data | null)[][];

export interface Dimensions {
  cols: number;
  rows: number;
}

function createColumn(rowCount: number) {
  return times(rowCount, (x) => {
    return new Point(x, rowCount);
  });
}

export function createMatrix<Data>(dimensions: Dimensions): Matrix<Data> {
  return times(dimensions.cols, (num) => {
    return createColumn(dimensions.rows).map((item) => {
      item.y = num;
      return item;
    });
  });
}

export class Grid<D> {
  data: Matrix<D>;
  dimensions: Dimensions;

  constructor(dimensions: Dimensions) {
    this.dimensions = dimensions;
    this.data = createMatrix<D>(dimensions);
  }
}
