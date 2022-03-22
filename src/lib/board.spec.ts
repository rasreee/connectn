/**
 * @group lib
 * @group board
 */

import { getNextGameState, getNextRow } from 'components/Game/Game.helpers'
import { muteConsole } from 'test-utils/muteConsole'

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
    const winNumber = 2
    const startingState = createGameState({ columnCount: 2, rowCount: 2 })
    let nextGameState = getNextGameState(startingState, winNumber, 0)
    expect(nextGameState.board).toEqual([
      [1, 0],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, winNumber, 0)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, winNumber, 0)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [0, 0],
    ])

    nextGameState = getNextGameState(nextGameState, winNumber, 1)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [1, 0],
    ])

    nextGameState = getNextGameState(nextGameState, winNumber, 1)
    expect(nextGameState.board).toEqual([
      [1, 2],
      [1, 2],
    ])
  })
})
