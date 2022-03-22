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

export const getAllLinesInRow = (
  y: number,
  length: number,
  columnCount: number,
): Line[] => {
  const lines: Line[] = []

  for (let startX = 0; startX <= columnCount - length; startX++) {
    const line: Line = []
    for (let dx = 0; dx < length; dx++) {
      line.push(createPoint(startX + dx, y))
    }

    lines.push(line)
  }

  return lines
}

export const getAllHorizontalLines = (
  columnCount: number,
  rowCount: number,
  length: number,
): Line[] => {
  let lines: Line[] = []
  for (let y = 0; y < rowCount; y++) {
    const linesInRow = getAllLinesInRow(y, length, columnCount)
    lines = lines.concat(linesInRow)
  }

  return lines
}

export const getAllLinesInColumn = (
  x: number,
  length: number,
  columnCount: number,
): Line[] => {
  const lines: Line[] = []

  for (let startY = 0; startY <= columnCount - length; startY++) {
    const line: Line = []
    for (let dy = 0; dy < length; dy++) {
      line.push(createPoint(x, startY + dy))
    }

    lines.push(line)
  }

  return lines
}

export const getAllVerticalLines = (
  columnCount: number,
  rowCount: number,
  length: number,
): Line[] => {
  let lines: Line[] = []
  for (let x = 0; x < columnCount; x++) {
    const linesInColumn = getAllLinesInColumn(x, length, rowCount)
    lines = lines.concat(linesInColumn)
  }

  return lines
}

export const isOutOfBounds = (
  coords: Coordinates,
  columnCount: number,
  rowCount: number,
): boolean => {
  const [x, y] = coords

  return x < 0 || x >= columnCount || y < 0 || y >= rowCount
}

const delta = { ['diagonal-up']: [1, 1], ['diagonal-down']: [-1, -1] }

export const getNextCoords = (
  coords: Coordinates,
  direction: 'diagonal-up' | 'diagonal-down',
): Coordinates => {
  const [x, y] = coords
  const [dx, dy] = delta[direction]

  return createPoint(x + dx, y + dy)
}

export const getAllLinesInDiagonal = (
  start: Coordinates,
  length: number,
  columnCount: number,
  rowCount: number,
  direction: 'diagonal-up' | 'diagonal-down',
): Line[] => {
  const lines: Line[] = []

  let line: Line = []
  let coords: Coordinates = [...start]

  while (!isOutOfBounds(coords, columnCount, rowCount)) {
    if (line.length === length) {
      lines.push(line)
      line = []
      break
    }
    line.push(coords)
    coords = getNextCoords(coords, direction)
  }

  return lines
}

export const getAllDiagonalLines = (
  columnCount: number,
  rowCount: number,
  length: number,
): Line[] => {
  let lines: Line[] = []

  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      const linesInDiagonal = getAllLinesInDiagonal(
        [x, y],
        length,
        columnCount,
        rowCount,
        'diagonal-up',
      )
      lines = lines.concat(linesInDiagonal)
    }
  }

  for (let x = columnCount - 1; x >= 0; x--) {
    for (let y = rowCount - 1; y >= 0; y--) {
      const linesInDiagonal = getAllLinesInDiagonal(
        [x, y],
        length,
        columnCount,
        rowCount,
        'diagonal-down',
      )
      lines = lines.concat(linesInDiagonal)
    }
  }

  return lines
}

export const getAllLinesOfLength = (
  columnCount: number,
  rowCount: number,
  length: number,
): Line[] => {
  const horizontalLines = getAllHorizontalLines(columnCount, rowCount, length)
  const verticalLines = getAllVerticalLines(columnCount, rowCount, length)
  const diagonalLines = getAllDiagonalLines(columnCount, rowCount, length)

  return [...horizontalLines, ...verticalLines, ...diagonalLines]
}
