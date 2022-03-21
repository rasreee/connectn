import times from 'lodash.times'

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
