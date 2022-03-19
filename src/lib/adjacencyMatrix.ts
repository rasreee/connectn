import {
  CoordsString,
  getCoordsStrings,
  isAdjacentCoords,
  toCoordsObject,
} from './coords';
import { Grid, Point } from './grid';

export type AdjacencyMap = Record<CoordsString, CoordsString[]>;

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

export function createAdjacencyMap(grid: Grid): AdjacencyMap {
  const adjacencyMatrix = initializeAdjacencyMap(
    grid.columnCount,
    grid.rowCount
  );

  grid.points.forEach((point) => {
    if (!point.value) return;

    grid.points
      .filter((item) => !item.isEqual(point))
      .forEach((other) => {
        if (!other.isAdjacentTo(point.coords)) return;

        adjacencyMatrix[point.coordsString] = [other.coordsString];
        adjacencyMatrix[other.coordsString] = [point.coordsString];
      });
  });

  return adjacencyMatrix;
}

export class AdjacencyMatrix {
  data: AdjacencyMap;

  constructor(grid: Grid) {
    this.data = createAdjacencyMap(grid);
  }

  refresh = (point: Point) => {
    if (!point.value) {
      Object.keys(this.data).forEach((coordsString) => {
        const key = coordsString as keyof typeof this.data;
        const adjs = this.data[key].filter((item) => item !== coordsString);

        this.data[key] = adjs;
      });
    } else {
      Object.keys(this.data)
        .filter((item) => item !== point.coordsString)
        .forEach((coordsString) => {
          const coords = toCoordsObject(coordsString);
          const key = coordsString as keyof typeof this.data;

          const oldList = this.data[key];
          let newList: CoordsString[] = [];
          if (oldList.includes(point.coordsString)) {
            newList = [
              ...oldList.filter((item) => item === point.coordsString),
              point.coordsString,
            ];
          } else if (isAdjacentCoords(coords, point.coords)) {
            newList = [...oldList, point.coordsString];
          }
          this.data[key] = newList;
        });
    }
  };
}
