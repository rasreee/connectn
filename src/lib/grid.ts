import times from 'lodash.times';

import { AdjacencyMatrix } from './adjacencyMatrix';
import {
  Coords,
  CoordsObject,
  CoordsString,
  isAdjacentCoords,
  toCoordsString,
} from './coords';

export class Point<Data = any> {
  value: Data | null;
  x: number;
  y: number;

  constructor(x: number, y: number, value: Data | null = null) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  get coords(): CoordsObject {
    return { x: this.x, y: this.y };
  }

  get coordsString(): CoordsString {
    return toCoordsString(this.coords);
  }

  isAdjacentTo = (coords: Coords): boolean =>
    isAdjacentCoords(coords, this.coords);

  isEqual = (point: Point): boolean => this.coordsString === point.coordsString;

  isAt = (x: number, y: number): boolean => this.x === x && this.y === y;
}

export type Matrix<Data> = Point<Data>[][];

export type MatrixValues<Data> = (Data | null)[][];

function initializeColumn(rowCount: number) {
  return times(rowCount, (x) => new Point(x, rowCount));
}

function initializeMatrix<Data>(
  columnCount: number,
  rowCount: number
): Matrix<Data> {
  return times(columnCount, () => initializeColumn(rowCount));
}

export class Grid<Data = any> {
  points: Point<Data>[];
  data: Matrix<Data>;
  adjacents: AdjacencyMatrix;
  rowCount: number;
  columnCount: number;

  constructor(columnCount: number, rowCount: number) {
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    const data = initializeMatrix<Data>(columnCount, rowCount);
    this.data = data;
    this.points = data.flat().flat();
    this.adjacents = new AdjacencyMatrix(this);
  }

  get columns(): Point<Data>[][] {
    return this.data.map((column) => column);
  }

  get values(): MatrixValues<Data> {
    return this.columns.map((column) => column.map((point) => point.value));
  }

  setPoint = (x: number, y: number, value: Data) => {
    const oldPoints = this.points;
    const points = oldPoints.filter((point) => !point.isAt(x, y));
    const newPoint = new Point(x, y, value);
    this.points = [...points, newPoint];
    this.adjacents.refresh(newPoint);
  };

  getPoint = (x: number, y: number): Point<Data> =>
    this.points.find((point) => point.isAt(x, y))!;

  clear = () => {
    const data = initializeMatrix<Data>(this.columnCount, this.rowCount);
    this.data = data;
    this.points = data.flat().flat();
  };
}
