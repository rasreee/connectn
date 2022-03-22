import { createGrid, getAllLinesInRow, getAllLinesOfLength } from './grid'

/**
 * @group grid
 */
describe('lib/grid', () => {
  describe('createGrid', () => {
    it('creates grid', () => {
      const grid = createGrid(2, 2, 0)
      expect(grid).toEqual([
        [0, 0],
        [0, 0],
      ])
    })
  })

  describe('getAllLinesInRow', () => {
    it('returns all possible lines in row', () => {
      const length = 2
      const columnCount = 3

      const lines = getAllLinesInRow(0, length, columnCount)

      expect(lines).toEqual([
        [
          [0, 0],
          [1, 0],
        ],
        [
          [1, 0],
          [2, 0],
        ],
      ])
    })
  })

  describe.only('getAllLinesOfLength', () => {
    it('returns all possible lines of given length for given dimensions', () => {
      const length = 2
      const dimensions = { columnCount: 3, rowCount: 3 }

      const lines = getAllLinesOfLength(
        dimensions.columnCount,
        dimensions.rowCount,
        length,
      )

      expect(lines).toEqual([
        // HORIZONTAL LINES
        [
          [0, 0],
          [1, 0],
        ],
        [
          [1, 0],
          [2, 0],
        ],
        [
          [0, 1],
          [1, 1],
        ],
        [
          [1, 1],
          [2, 1],
        ],
        [
          [0, 2],
          [1, 2],
        ],
        [
          [1, 2],
          [2, 2],
        ],
        // VERTICAL LINES
        [
          [0, 0],
          [0, 1],
        ],
        [
          [0, 1],
          [0, 2],
        ],
        [
          [1, 0],
          [1, 1],
        ],
        [
          [1, 1],
          [1, 2],
        ],
        [
          [2, 0],
          [2, 1],
        ],
        [
          [2, 1],
          [2, 2],
        ],
        // DIAGONAL LINES
        [
          [0, 0],
          [1, 1],
        ],
        [
          [1, 1],
          [2, 2],
        ],
        [
          [0, 1],
          [1, 2],
        ],
        [
          [1, 0],
          [2, 1],
        ],
      ])
    })
  })
})
