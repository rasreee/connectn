import times from 'lodash.times';

export type Matrix<Data = any> = Data[][];

export interface Dimensions {
  cols: number;
  rows: number;
}

export type CreateItem<D = any, Model = any> = (
  column: number,
  row: number,
  value: D | null
) => Model;

function createColumn<D = any, Model = any>(
  column: number,
  rowCount: number,
  createItem: CreateItem<D, Model>
) {
  return times(rowCount, (row) => createItem(column, row, null));
}

export function createMatrix<D = any, Model = any>(
  dimensions: Dimensions,
  createItem: CreateItem<D, Model>
): Model[] {
  return times(dimensions.cols, (col) =>
    createColumn<D, Model>(col, dimensions.rows, createItem)
  ).flat();
}
