export class GridNode<T> {
  x: number
  y: number
  constructor(x: number, y: number, readonly value: T) {
    this.x = x
    this.y = y
  }

  clone = (): GridNode<T> => new GridNode<T>(this.x, this.y, this.value)
}
