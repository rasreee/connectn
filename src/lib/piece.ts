import { GameInfo } from './gameInfo';
import { Slot, slotUtils } from './slot';

export interface Piece {
  playerName: string;
  slot: Slot;
}

export const getPieceColor = (piece: Piece, info: GameInfo) => {
  const isPlayerOne = piece.playerName === info.playerOneName;

  return isPlayerOne ? 'red' : 'green';
};

export const getAdjacentPieces = (target: Piece, list: Piece[]): Piece[] => {
  const relevantPieces = list.filter(
    (piece) =>
      piece.playerName === target.playerName &&
      !slotUtils.isEqual(piece.slot, target.slot)
  );

  return relevantPieces.filter((piece) =>
    slotUtils.isAdjacent(piece.slot, target.slot)
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

  const visitedSlot: Slot[] = [];

  const isVisited = (coords: Slot): boolean =>
    visitedSlot.some((visited) => slotUtils.isEqual(visited, coords));

  list.forEach((piece) => {
    if (isVisited(piece.slot)) return;
    visitedSlot.push(piece.slot);
    lines.push(...getLinesIncluding(piece, list));
  });

  const longestLine = lines.sort((a, b) => a.length - b.length).at(0) ?? [];
  return longestLine;
};
