import {
  CoordsString,
  CoordsTuple,
  getCoordsStrings,
  toCoordsString,
} from './coords';

export type AdjacencyString = `${CoordsString} <> ${CoordsString}`;

export type AdjacencyMatrix = Record<AdjacencyString, boolean>;

export function getAdjacencyKey(
  coords: CoordsString | CoordsTuple,
  other: CoordsString | CoordsTuple
): AdjacencyString {
  return `${toCoordsString(coords)} <> ${toCoordsString(other)}`;
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
