import { CreateItem, createMatrix, Dimensions, Matrix } from 'models/matrix';

export class Grid<D = any, Model = any> {
  data: Matrix<D>;
  dimensions: Dimensions;

  constructor(dimensions: Dimensions, createItem: CreateItem<D, Model>) {
    this.dimensions = dimensions;
    this.data = createMatrix<D>(dimensions, createItem);
  }

  setPoint = (x: number, y: number, value: D) => (this.data[x][y] = value);
}
