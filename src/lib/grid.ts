import times from 'lodash.times';

export interface Coords {
  x: number;
  y: number;
}

export type CoordsString = `(${string},${string})`;

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

export type AdjacencyString = `${CoordsString} <> ${CoordsString}`;

export type AdjacencyMatrix = Record<AdjacencyString, boolean>;

export type CoordsTuple = [number, number];

export function getCoordsString(x: number, y: number): CoordsString {
  return `(${x},${y})`;
}

export function toCoordsString(
  value: CoordsString | CoordsTuple
): CoordsString {
  if (Array.isArray(value)) return getCoordsString(...value);

  return value;
}

export function getAdjacencyKey(
  coords: CoordsString | CoordsTuple,
  other: CoordsString | CoordsTuple
): AdjacencyString {
  return `${toCoordsString(coords)} <> ${toCoordsString(other)}`;
}

export function getCoordsStrings(
  columnCount: number,
  rowCount: number
): CoordsString[] {
  const coordsStrings: CoordsString[] = [];

  for (let x = 0; x < columnCount; x += 1) {
    for (let y = 0; y < rowCount; y += 1) {
      coordsStrings.push(getCoordsString(x, y));
    }
  }

  return coordsStrings;
}

export function initializeAdjacencyMatrix(
  columnCount: number,
  rowCount: number
): AdjacencyMatrix {
  const coordsStrings = getCoordsStrings(columnCount, rowCount);

  const adjacencyMatrix = {} as AdjacencyMatrix;

  coordsStrings.forEach((coords) => {
    const rest = coordsStrings.filter((value) => value !== coords);
    rest.forEach((other) => {
      adjacencyMatrix[getAdjacencyKey(coords, other)] = false;
    });
  });

  return adjacencyMatrix;
}

export class Grid<Data = any> {
  data: Matrix<Data>;
  adjacents: AdjacencyMatrix;

  constructor(columnCount: number, rowCount: number) {
    this.data = initializeMatrix<Data>(columnCount, rowCount);
    this.adjacents = initializeAdjacencyMatrix(columnCount, rowCount);
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
