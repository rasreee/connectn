import { createGrid, getLinesOfLength } from './grid'

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

  describe.only('getLinesOfLength', () => {
    it('returns all possible lines of given length for given dimensions', () => {
      const length = 2
      const dimensions = { columnCount: 3, rowCount: 3 }

      const lines = getLinesOfLength(
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
        [
          [0, 1],
          [1, 0],
        ],
        [
          [1, 2],
          [2, 1],
        ],
      ])
    })
  })
})
