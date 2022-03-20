import times from 'lodash.times';

export type Matrix<Data extends any = any> = Data[][];

function createColumn<Data>(rowCount: number, initialData: Data) {
  return times(rowCount, () => initialData);
}

export function initMatrix<Data extends any = any>(
  cols: number,
  rows: number,
  initialData: Data
): Matrix<Data> {
  return times(cols, () => createColumn<Data>(rows, initialData));
}

export function cloneMatrix(initialMatrix: Matrix): Matrix {
  const columnCount = initialMatrix.length;

  const matrix: Matrix = [];

  for (let column = 0; column < columnCount; column += 1) {
    matrix[column] = [...initialMatrix[column]];
  }

  return matrix;
}
