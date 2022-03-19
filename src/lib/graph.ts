import { CoordObject, Coords } from './coords';
import { Grid } from './grid';
import { Line, Point } from './point';

export interface Direction {
  dx: number;
  dy: number;
}

function invertDirection(direction: Direction): Direction {
  return { dx: direction.dx * -1, dy: direction.dy * -1 };
}

function getNextPoint(last: CoordObject, dir: Direction) {
  return { x: last.x + dir.dx, y: last.y + dir.dy };
}

export class Graph<Data> extends Grid<Data> {
  constructor(columnCount: number, rowCount: number) {
    super(columnCount, rowCount);
  }

  isWithinBounds(coords: CoordObject): boolean {
    return (
      coords.x > 0 &&
      coords.x < this.columnCount &&
      coords.y > 0 &&
      coords.y < this.rowCount
    );
  }

  getAdjacents = (target: Point<Data>): Line<Data> => {
    return this.points.filter((point) => point.isAdjacentTo(target));
  };

  exploreDirection = (dir: Direction, start: Point<Data>): CoordObject[] => {
    const result: CoordObject[] = [];

    let last: CoordObject = start;
    while (this.isWithinBounds(getNextPoint(last, dir))) {
      const newCoords = getNextPoint(last, dir);
      result.push(newCoords);
      last = newCoords;
    }

    return result;
  };

  discoverLine = (initial: Line<Data>): Line<Data> => {
    const [a, b] = initial;
    const dir = { dx: a.x - b.x, dy: a.y - b.y };

    const line0 = this.exploreDirection(dir, dir.dx < 0 ? a : b);
    const line1 = this.exploreDirection(
      invertDirection(dir),
      dir.dx < 0 ? b : a
    );

    const rest: Line<Data> = [...line0, ...line1].map(
      (targetCoords) => this.points.find((point) => point.isAt(targetCoords))!
    );

    return [...initial, ...rest];
  };

  getLinesIncluding = (target: Point<Data>): Array<Line<Data>> => {
    const adjacents = this.getAdjacents(target);

    const lines: Array<Line<Data>> = [];

    adjacents.forEach((adj) => {
      if (lines.some((line) => line.includes(target))) return;
      lines.push(this.discoverLine([target, adj]));
    });

    return lines;
  };

  getLongestLine = (): Coords[] => {
    const list = this.points;
    const lines: Array<Line<Data>> = [];

    const isVisited = (target: Point<Data>): boolean =>
      lines.some((line) => line.some((item) => item.isEqualTo(target)));

    list.forEach((point) => {
      if (isVisited(point)) return;

      lines.push(...this.getLinesIncluding(point));
    });

    const longestLine = lines.sort((a, b) => a.length - b.length).at(0) ?? [];
    return longestLine;
  };
}
