import { createMatrix, Dimensions, Matrix } from 'lib/matrix';

export class Grid<D = any> {
  data: Matrix<D>;
  dimensions: Dimensions;

  constructor(dimensions: Dimensions, classType: D) {
    this.dimensions = dimensions;
    this.data = createMatrix<D>(dimensions, classType);
  }

  setPoint = (x: number, y: number, value: D) => (this.data[x][y] = value);
}
