import { createGrid, setGridSlot } from './grid'

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

  describe('setGridSlot', () => {
    it('sets grid slot', () => {
      let grid = createGrid(2, 2, 0)
      grid = setGridSlot(grid, 0, 0, 1)
      expect(grid).toEqual([
        [1, 0],
        [0, 0],
      ])
      grid = setGridSlot(grid, 0, 1, 2)
      expect(grid).toEqual([
        [1, 2],
        [0, 0],
      ])
      grid = setGridSlot(grid, 1, 0, 1)
      expect(grid).toEqual([
        [1, 2],
        [1, 0],
      ])
      grid = setGridSlot(grid, 1, 1, 2)
      expect(grid).toEqual([
        [1, 2],
        [1, 2],
      ])
    })
  })
})
