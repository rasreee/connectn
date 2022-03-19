import {
  CoordObject,
  Coords,
  CoordString,
  toCoordsObject,
  toCoordsString,
} from './coords';

export class Point<Data = any> {
  value: Data | null;
  x: number;
  y: number;

  constructor(x: number, y: number, value: Data | null = null) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  get coords(): CoordObject {
    return { x: this.x, y: this.y };
  }

  get coordString(): CoordString {
    return toCoordsString(this.coords);
  }

  isAdjacentTo = (target: Coords): boolean => {
    const aValues = this.coords;
    const coords = toCoordsObject(target);
    const xDel = Math.abs(aValues.x - coords.x);
    const yDel = Math.abs(aValues.y - coords.y);
    return (
      (xDel === 1 && yDel === 0) ||
      (yDel === 1 && xDel === 0) ||
      (yDel === 1 && xDel === 1)
    );
  };

  isEqualTo = (point: Point): boolean =>
    this.coords.x === point.coords.x && this.coords.y === point.coords.y;

  isAt = (coords: Coords): boolean => {
    const { x, y } = toCoordsObject(coords);
    return this.x === x && this.y === y;
  };
}

export type Line<Data> = Array<Point<Data>>;
