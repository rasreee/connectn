/**
 * @group lib
 * @group board
 */

import { getNextBoard, getNextRow } from './board'
import { createGrid } from './grid'
import { Player } from './player'

describe('lib/board', () => {
  it('getNextRow', () => {
    expect(getNextRow([Player.None, Player.None])).toEqual(0)
    expect(getNextRow([Player.PlayerOne, Player.None])).toEqual(1)
    expect(getNextRow([Player.PlayerOne, Player.PlayerOne])).toEqual(null)
  })

  it('getNextBoard', () => {
    const startingBoard = createGrid<Player>(2, 2, Player.None)
    const currentPlayer = Player.PlayerOne
    let nextBoard = getNextBoard(startingBoard, 0, currentPlayer)
    expect(nextBoard).toEqual([
      [1, 0],
      [0, 0],
    ])

    nextBoard = getNextBoard(nextBoard, 0, currentPlayer)
    expect(nextBoard).toEqual([
      [1, 1],
      [0, 0],
    ])

    nextBoard = getNextBoard(nextBoard, 0, Player.PlayerTwo)
    expect(nextBoard).toEqual([
      [1, 1],
      [0, 0],
    ])

    nextBoard = getNextBoard(nextBoard, 1, currentPlayer)
    expect(nextBoard).toEqual([
      [1, 1],
      [1, 0],
    ])

    nextBoard = getNextBoard(nextBoard, 1, currentPlayer)
    expect(nextBoard).toEqual([
      [1, 1],
      [1, 1],
    ])
  })
})
