/**
 * @group lib
 * @group board
 */

import { muteConsole } from 'testing/muteConsole'

import { getNextGameState, getNextRow } from './board'
import { createGameState } from './game'
import { Player } from './player'

describe('lib/board', () => {
  beforeEach(() => {
    muteConsole()
  })

  it('getNextRow', () => {
    expect(getNextRow([Player.None, Player.None])).toEqual(0)
    expect(getNextRow([Player.PlayerOne, Player.None])).toEqual(1)
    expect(getNextRow([Player.PlayerOne, Player.PlayerOne])).toEqual(null)
  })

  it('getNextGameState', () => {
    const startingState = createGameState({ columnCount: 2, rowCount: 2 })
    let nextGameState = getNextGameState(startingState, 0)
    expect(nextGameState.board).toEqual([
      [1, 0],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, 0)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, 0)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, 1)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [1, 0],
    ])

    nextGameState = getNextGameState(nextGameState, 1)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [1, 2],
    ])
  })
})
