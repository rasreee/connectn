import { DEFAULT_GAME_INFO, GameInfo } from './gameInfo';
import { createSlot, Slot, slotUtils } from './slot';

export interface Piece {
  playerName: string;
  slot: Slot;
}

export function createPiece(
  slot: [number, number],
  playerName = DEFAULT_GAME_INFO.playerOneName
): Piece {
  return { playerName, slot: createSlot(...slot) };
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
    lines.push([target, adjacentPiece]);
  });

  return lines;
};

export const getLongestLine = (list: Piece[]): Piece[] => {
  const lines: Array<Piece[]> = [];

  const isVisited = (slot: Slot): boolean =>
    lines.some((line) =>
      line.some((item) => slotUtils.isEqual(item.slot, slot))
    );

  list.forEach((piece) => {
    if (isVisited(piece.slot)) return;

    lines.push(...getLinesIncluding(piece, list));
  });

  const longestLine = lines.sort((a, b) => a.length - b.length).at(0) ?? [];
  return longestLine;
};
