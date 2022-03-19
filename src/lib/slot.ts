import { Piece } from './piece';

export interface Slot {
  row: number;
  column: number;
}

export function getIsSlotTaken(target: Slot, pieces: Piece[]): boolean {
  return pieces.some((piece) => slotUtils.isEqual(piece.slot, target));
}

const isEqual = (a: Slot, b: Slot): boolean =>
  a.column === b.column && a.row === b.row;

const isAdjacent = (a: Slot, b: Slot): boolean =>
  a.column - b.column === 1 || a.row - b.row === 1;

export const slotUtils = {
  isEqual,
  isAdjacent,
};
