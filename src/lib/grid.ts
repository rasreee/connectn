import times from 'lodash.times'

export interface Slot {
  column: number
  row: number
}

export interface Dimensions {
  columnCount: number
  rowCount: number
}

export type Grid<T = any> = T[][]

export const cloneGrid = <T = any>(initialGrid: Grid<T>): Grid<T> => {
  const columnCount = initialGrid.length

  const grid: Grid<T> = []

  for (let column = 0; column < columnCount; column += 1) {
    grid[column] = [...initialGrid[column]]
  }

  return grid
}

export const createGrid = <T = any>(
  columnCount: number,
  rowCount: number,
  initialValue: T,
): Grid<T> => {
  const grid: Grid<T> = []

  for (let col = 0; col < columnCount; col++) {
    for (let row = 0; row < rowCount; row++) {
      grid[col] = times(rowCount, () => initialValue)
    }
  }

  return grid
}

export const resetGrid = <T = any>(
  initialGrid: Grid<T>,
  initialValue: T,
): Grid<T> => {
  const columnCount = initialGrid.length
  const rowCount = initialGrid[0].length

  return createGrid<T>(columnCount, rowCount, initialValue)
}

export const setGridSlot = <T = any>(
  grid: Grid<T>,
  column: number,
  row: number,
  value: T,
): Grid<T> => {
  const newBoard = cloneGrid(grid)
  newBoard[column][row] = value
  return newBoard
}

export type Coordinates = [number, number]

export type Line = Coordinates[]

export const createPoint = (x: number, y: number): Coordinates => {
  return [x, y]
}

export const isOutOfBounds = (
  coords: Coordinates,
  columnCount: number,
  rowCount: number,
): boolean => {
  const [x, y] = coords

  return x < 0 || x >= columnCount || y < 0 || y >= rowCount
}

export const directions = {
  North: 'North',
  East: 'East',
  NorthEast: 'NorthEast',
  SouthEast: 'SouthEast',
} as const

export type Direction = typeof directions[keyof typeof directions]

const delta = {
  [directions.NorthEast]: [1, 1],
  [directions.SouthEast]: [-1, -1],
  [directions.North]: [0, 1],
  [directions.East]: [1, 0],
}

export const getNextCoords = (
  coords: Coordinates,
  direction: Direction,
): Coordinates => {
  const [x, y] = coords
  const [dx, dy] = delta[direction]

  return createPoint(x + dx, y + dy)
}

export const getLinesInDirectionStartingAt = ({
  start,
  length,
  columnCount,
  rowCount,
  direction,
}: {
  start: Coordinates
  length: number
  columnCount: number
  rowCount: number
  direction: Direction
}): Line[] => {
  const lines: Line[] = []

  let line: Line = []
  let coords: Coordinates = [...start]

  while (!isOutOfBounds(coords, columnCount, rowCount)) {
    if (line.length === length) {
      lines.push(line)
      line = []
      const nextCoords = getNextCoords(start, direction)
      coords = nextCoords
      continue
    }
    line.push(coords)
    const nextCoords = getNextCoords(coords, direction)
    coords = nextCoords
  }

  return lines
}

export const getLinesInDirection = ({
  direction,
  columnCount,
  rowCount,
  length,
}: {
  direction: Direction
  columnCount: number
  rowCount: number
  length: number
}): Line[] => {
  let lines: Line[] = []

  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      const linesInDirection = getLinesInDirectionStartingAt({
        start: [x, y],
        length,
        columnCount,
        rowCount,
        direction,
      })
      lines = lines.concat(linesInDirection)
    }
  }

  return lines
}

export const getLinesOfLength = (
  columnCount: number,
  rowCount: number,
  length: number,
): Line[] => {
  let lines: Line[] = []

  Object.values(directions).forEach((direction) => {
    lines = lines.concat(
      getLinesInDirection({ direction, columnCount, rowCount, length }),
    )
  })

  return lines
}
