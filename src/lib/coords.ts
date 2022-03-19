export interface Coords {
  x: number;
  y: number;
}

const isEqual = (a: Coords, b: Coords): boolean => a.x === b.x && a.y === b.y;

const isAdjacent = (a: Coords, b: Coords): boolean =>
  a.x - b.x === 1 || a.y - b.y === 1;

export const coordsUtils = {
  isEqual,
  isAdjacent,
};
