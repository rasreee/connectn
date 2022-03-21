import times from 'lodash.times';

import { MaybePlayer } from './player';

export type Matrix = MaybePlayer[][];

function createColumn(rowCount: number, initialData: MaybePlayer) {
  return times(rowCount, () => initialData);
}

export function initializeMatrix(
  cols: number,
  rows: number,
): Matrix {
  return times(cols, () => createColumn(rows, MaybePlayer.None));
}

export function cloneMatrix(initialMatrix: Matrix): Matrix {
  const columnCount = initialMatrix.length;

  const matrix: Matrix = [];

  for (let column = 0; column < columnCount; column += 1) {
    matrix[column] = [...initialMatrix[column]];
  }

  return matrix;
}
