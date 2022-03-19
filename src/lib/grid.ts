import times from 'lodash.times';

import { AdjacencyMatrix, initializeAdjacencyMatrix } from './adjacencyMatrix';

export class Point<Data = any> {
  value: Data | null;

  constructor(value: Data | null = null) {
    this.value = value;
  }
}

export type Matrix<Data> = Point<Data>[][];

export type MatrixValues<Data> = (Data | null)[][];

function initializeColumn(rowCount: number) {
  return times(rowCount, () => new Point());
}

function initializeMatrix<Data>(
  columnCount: number,
  rowCount: number
): Matrix<Data> {
  return times(columnCount, () => initializeColumn(rowCount));
}

export class Grid<Data = any> {
  data: Matrix<Data>;
  adjacents: AdjacencyMatrix;

  constructor(columnCount: number, rowCount: number) {
    this.data = initializeMatrix<Data>(columnCount, rowCount);
    this.adjacents = initializeAdjacencyMatrix(columnCount, rowCount);
  }

  get values(): MatrixValues<Data> {
    return this.data.map((column) => column.map((point) => point.value));
  }

  get columnCount(): number {
    return this.data.length;
  }

  get rowCount(): number {
    return this.data[0].length;
  }

  setPoint = (x: number, y: number, value: Data | null) =>
    (this.data[x][y] = new Point(value));

  getPoint = (x: number, y: number): Point<Data> => this.data[x][y];

  clear = () => (this.data = initializeMatrix(this.columnCount, this.rowCount));
}
