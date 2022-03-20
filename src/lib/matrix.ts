import times from 'lodash.times';

export type Matrix<Data = any> = Data[][];

export interface Dimensions {
  cols: number;
  rows: number;
}

function createColumn(rowCount: number, classType: any) {
  return times(rowCount, () => {
    return new classType();
  });
}

export function createMatrix<D = any>(
  dimensions: Dimensions,
  classType: D
): Matrix<D> {
  return times(dimensions.cols, () => {
    return createColumn(dimensions.rows, classType);
  });
}
