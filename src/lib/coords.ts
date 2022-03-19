import { invariant } from './invariant';

export type CoordsObject = { x: number; y: number };

export function isCoordsObject(o: any): o is CoordsObject {
  return (
    typeof o === 'object' &&
    'x' in o &&
    typeof o.x === 'number' &&
    'y' in o &&
    typeof o.y === 'number'
  );
}

export type CoordsString = `(${string},${string})` | string;

export type CoordsTuple = [number, number];

export type Coords = CoordsObject | CoordsString | CoordsTuple;

export function isCoordsString(o: any): o is CoordsString {
  const re = new RegExp('(\\d+,\\d+)');

  return typeof o === 'string' && re.test(o);
}

export function toCoordsObject(coords: Coords): CoordsObject {
  if (isCoordsObject(coords)) return coords;
  if (Array.isArray(coords)) return { x: coords[0], y: coords[1] };

  invariant(isCoordsString(coords), `invalid coordsString: ${coords}`);

  let s = coords.replace('(', '');
  s = s.replace(')', '');
  const [x, y] = s.split(',');

  return { x: parseInt(x), y: parseInt(y) };
}

export function getCoordsString(x: number, y: number): CoordsString {
  return `(${x},${y})`;
}

export function toCoordsString(value: Coords): CoordsString {
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) return getCoordsString(...value);

  return getCoordsString(value.x, value.y);
}

export function getCoordsStrings(
  columnCount: number,
  rowCount: number
): CoordsString[] {
  const coordsStrings: CoordsString[] = [];

  for (let x = 0; x < columnCount; x += 1) {
    for (let y = 0; y < rowCount; y += 1) {
      coordsStrings.push(getCoordsString(x, y));
    }
  }

  return coordsStrings;
}

export function isAdjacentCoords(a: Coords, b: Coords): boolean {
  const aValues = toCoordsObject(a);
  const bValues = toCoordsObject(b);

  return aValues.x - bValues.x === 1 || aValues.y - bValues.y === 1;
}
