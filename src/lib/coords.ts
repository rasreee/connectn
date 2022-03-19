import { invariant } from './invariant';

export type CoordObject = { x: number; y: number };

export function isCoordsObject(o: any): o is CoordObject {
  return (
    typeof o === 'object' &&
    'x' in o &&
    typeof o.x === 'number' &&
    'y' in o &&
    typeof o.y === 'number'
  );
}

export type CoordString = `(${string},${string})` | string;

export type CoordsTuple = [number, number];

export type Coords = CoordObject | CoordString | CoordsTuple;

export function isCoordsString(o: any): o is CoordString {
  const re = new RegExp('(\\d+,\\d+)');

  return typeof o === 'string' && re.test(o);
}

export function toCoordsObject(coords: Coords): CoordObject {
  if (isCoordsObject(coords)) return coords;
  if (Array.isArray(coords)) return { x: coords[0], y: coords[1] };

  invariant(isCoordsString(coords), `invalid coordString: ${coords}`);

  let s = coords.replace('(', '');
  s = s.replace(')', '');
  const [x, y] = s.split(',');

  return { x: parseInt(x), y: parseInt(y) };
}

export function getCoordsString(x: number, y: number): CoordString {
  return `(${x},${y})`;
}

export function toCoordsString(value: Coords): CoordString {
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) return getCoordsString(...value);

  return getCoordsString(value.x, value.y);
}

export function getCoordsStrings(
  columnCount: number,
  rowCount: number
): CoordString[] {
  const coordsStrings: CoordString[] = [];

  for (let x = 0; x < columnCount; x += 1) {
    for (let y = 0; y < rowCount; y += 1) {
      coordsStrings.push(getCoordsString(x, y));
    }
  }

  return coordsStrings;
}

export function toCoordsTuple(coords: Coords): CoordsTuple {
  if (Array.isArray(coords)) return coords;

  const coordsObj = toCoordsObject(coords);

  return [coordsObj.x, coordsObj.y];
}
