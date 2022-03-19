import { Coords, coordsUtils } from './coords';
import { GameInfo } from './gameInfo';

export interface Piece {
  playerName: string;
  coords: { x: number; y: number };
}

export const getPieceColor = (piece: Piece, info: GameInfo) => {
  const isPlayerOne = piece.playerName === info.playerOneName;

  return isPlayerOne ? 'red' : 'green';
};

export const getAdjacentPieces = (target: Piece, list: Piece[]): Piece[] => {
  const relevantPieces = list.filter(
    (piece) =>
      piece.playerName === target.playerName &&
      !coordsUtils.isEqual(piece.coords, target.coords)
  );

  return relevantPieces.filter((piece) =>
    coordsUtils.isAdjacent(piece.coords, target.coords)
  );
};

export const getLinesIncluding = (
  target: Piece,
  list: Piece[]
): Array<Piece[]> => {
  const adjacents = getAdjacentPieces(target, list);

  const lines: Array<Piece[]> = [];

  adjacents.forEach((adjacentPiece) => {
    // if (lines.some(line => line.))
  });

  return lines;
};

export const getLongestLine = (list: Piece[]): Piece[] => {
  const lines: Array<Piece[]> = [];

  const visitedCoords: Coords[] = [];

  const isVisited = (coords: Coords): boolean =>
    visitedCoords.some((visited) => coordsUtils.isEqual(visited, coords));

  list.forEach((currentPiece) => {
    if (isVisited(currentPiece.coords)) return;
    visitedCoords.push(currentPiece.coords);
    lines.push(...getLinesIncluding(currentPiece, list));
  });

  const longestLine = lines.sort((a, b) => a.length - b.length).at(0) ?? [];
  return longestLine;
};
