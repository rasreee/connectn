export type CoordsString = `(${string},${string})`;

export type CoordsTuple = [number, number];

export function getCoordsString(x: number, y: number): CoordsString {
  return `(${x},${y})`;
}

export function toCoordsString(
  value: CoordsString | CoordsTuple
): CoordsString {
  if (Array.isArray(value)) return getCoordsString(...value);

  return value;
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
