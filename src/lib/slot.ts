import { Piece } from './piece';

export interface Slot {
  row: number;
  column: number;
}

const isEqual = (a: Slot, b: Slot): boolean =>
  a.column === b.column && a.row === b.row;

const isAdjacent = (a: Slot, b: Slot): boolean =>
  a.column - b.column === 1 || a.row - b.row === 1;

const normalize = (
  { column, row: rowIndex }: Slot,
  rowCount: number
): Slot => ({
  column,
  row: rowCount - rowIndex - 1,
});

const isTaken = (target: Slot, pieces: Piece[]): boolean => {
  return pieces.some((piece) => slotUtils.isEqual(piece.slot, target));
};

export const slotUtils = {
  isEqual,
  isAdjacent,
  normalize,
  isTaken,
};
