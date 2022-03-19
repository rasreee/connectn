import { CoordString, getCoordsStrings } from './coords';
import { Grid } from './grid';
import { Point } from './point';

export type AdjacencyMap = Record<CoordString, CoordString[]>;

export function initializeAdjacencyMap(
  columnCount: number,
  rowCount: number
): AdjacencyMap {
  const coordsStrings = getCoordsStrings(columnCount, rowCount);

  const adjacencyMatrix = {} as AdjacencyMap;

  coordsStrings.forEach((coords) => {
    adjacencyMatrix[coords] = [];
  });

  return adjacencyMatrix;
}

export function createAdjacencyMap({ data }: GridData): AdjacencyMap {
  const points = data.flat().filter((point) => point.value !== null);

  const coordsStrings = points.map((point) => point.coordString);

  const adjacencyMatrix = {} as AdjacencyMap;

  coordsStrings.forEach((coords) => {
    points
      .filter((item) => !item.isAt(coords))
      .forEach((other) => {
        if (!other.isAdjacentTo(coords)) return;

        adjacencyMatrix[coords] = [other.coordString];
        adjacencyMatrix[other.coordString] = [coords];
      });
    adjacencyMatrix[coords] = [];
  });

  points.forEach((point) => {
    if (!point.value) return;

    points
      .filter((item) => !item.isEqualTo(point))
      .forEach((other) => {
        if (!other.isAdjacentTo(point.coords)) return;

        adjacencyMatrix[point.coordString] = [other.coordString];
        adjacencyMatrix[other.coordString] = [point.coordString];
      });
  });

  return adjacencyMatrix;
}

export type GridData = Pick<Grid, 'data'>;

export class AdjacencyMatrix {
  data: AdjacencyMap;

  constructor(private grid: GridData) {
    this.data = createAdjacencyMap(grid);
  }

  update = (updatedPoint: Point) => {
    const data = { ...this.data };
    const points = this.grid.data.flat();

    points
      .filter((item) => item.isAdjacentTo(updatedPoint))
      .forEach((point) => {
        const list = this.data[point.coordString] ?? [];
        const newList = [...list.filter((item) => item !== point.coordString)];
        if (point.value) {
          newList.push(point.coordString);
        }
        data[point.coordString] = newList;
      });
    this.data = data;
  };

  reset = (grid: Grid) => {
    this.grid = grid;
    this.data = createAdjacencyMap(grid);
  };
}
