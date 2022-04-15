import { Player } from 'lib/game'
import { DirectionType, getDirectionVectors, getVector } from 'lib/grid'

import { Chip } from '../models/chip.model'
import { GridModel } from '../models/grid.model'
import { GridNode } from '../models/node.model'

/**
 * @group models
 * @group grid
 */
describe('models/grid', () => {
  it('placeNode', () => {
    const grid = new GridModel(3, 2)
    grid.placeNode({ node: new GridNode<Player>(2, 0, 1), column: 2 })
    expect(grid.at(2, 0)).toEqual(1)
    grid.placeNode({ node: new GridNode<Player>(3, 0, 2), column: 3 })
    expect(grid.columns).toEqual([[], [], [1]])
  })
  it('at', () => {
    let grid = new GridBuilder().addRows([
      [2, 1],
      [null, 1],
    ])

    expect(grid.at(1, 0)).toEqual(1)

    grid = GridModel.fromRows([
      [0, 0],
      [0, 0],
    ])

    expect(grid.at(0, 1)).toEqual(0)
  })

  it('isFull', () => {
    expect(
      GridModel.fromRows([
        [1, 1],
        [1, 1],
      ]).isFull,
    ).toEqual(true)
  })

  it('isOutOfBounds', () => {
    const grid = new GridModel(2, 3)
    expect(grid.isOutOfBounds(-1, 0)).toEqual(true)
    expect(grid.isOutOfBounds(1, 0)).toEqual(false)
    expect(grid.isOutOfBounds(3, 0)).toEqual(true)
    expect(grid.isOutOfBounds(2, 0)).toEqual(true)
    expect(grid.isOutOfBounds(1, 3)).toEqual(true)
    expect(grid.isOutOfBounds(1, 2)).toEqual(false)
    expect(grid.isOutOfBounds(1, -1)).toEqual(true)
  })

  it('nextSlot', () => {
    const grid = GridModel.fromRows([
      [1, 2],
      [2, 1],
    ])
    expect(grid.nextSlot(0, 0, getVector('Right'))).toEqual([1, 0])
    expect(grid.nextSlot(0, 0, getVector('UpRight'))).toEqual([1, 1])
    expect(grid.nextSlot(1, 0, getVector('Left'))).toEqual([0, 0])
    expect(grid.nextSlot(0, 0, getVector('Left'))).toEqual([-1, 0])
    expect(grid.nextSlot(0, -1, getVector('Down'))).toEqual([0, -2])
  })

  it('exploreDirection', () => {
    const grid = GridModel.fromRows([
      [1, 1, 1],
      [null, null, null],
      [null, null, null],
    ])
    expect(
      grid
        .exploreDirection(
          new Chip(0, 0, 1),
          getDirectionVectors(DirectionType.Horizontal).positiveDirection,
        )
        .map((chip) => [chip.x, chip.y]),
    ).toEqual([
      [1, 0],
      [2, 0],
    ])
  })

  it('getConnection', () => {
    const grid = GridModel.fromRows([
      [1, 1, 1],
      [null, null, null],
      [null, null, null],
    ])
    expect(
      grid.getConnection(new Chip(0, 0, 1), 3)?.map((chip) => [chip.x, chip.y]),
    ).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ])

    expect(grid.getConnection(new Chip(0, 0, 1), 4)).toBeNull()
  })
})
