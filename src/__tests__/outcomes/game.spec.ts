import { GameStatus, OutcomeType, Player } from 'lib/game'
import { GameModel } from 'models/game.model'

const makeGame = (columnCount: number, rowCount: number, winNumber: number) =>
  new GameModel({
    settings: { columnCount, rowCount, winNumber },
  })

/**
 * @group models
 * @group game
 */
describe('models/game - GameModel', () => {
  describe('whole flow', () => {
    const game = makeGame(2, 2, 2)
    it('win outcome on 2x2 board', () => {
      game.play()
      expect(game.status).toEqual(GameStatus.InProgress)
      expect(game.currentPlayer).toEqual(Player.PlayerOne)

      game.placeChip(0)
      expect(game.currentPlayer).toEqual(Player.PlayerTwo)
      expect(game.lastPlacedPiece?.value).toEqual(1)

      game.placeChip(0)
      expect(game.currentPlayer).toEqual(Player.PlayerOne)
      expect(game.lastPlacedPiece?.value).toEqual(2)

      game.placeChip(0)
      expect(game.currentPlayer).toEqual(Player.PlayerOne)
      expect(game.lastPlacedPiece?.value).toEqual(2)
      expect(game.outcome).toEqual(null)

      game.placeChip(1)
      expect(game.currentPlayer).toBeNull()
      expect(game.outcome).toEqual({ type: OutcomeType.Win, winner: 1 })
      expect(game.status).toEqual(GameStatus.Complete)
    })

    it('restarts game with same settings', () => {
      game.restart()
      expect(game.status).toEqual(GameStatus.InProgress)
      expect(game.currentPlayer).toEqual(Player.PlayerOne)
    })
  })

  // describe('win outcomes', () => {
  //   describe.each(outcomeFixtures)(
  //     `#%#`,
  //     (winNumber, lastPlacedAt, columns) => {
  //       const dimensions = getGridDimensions(data)
  //       it(`${dimensions.columnCount}x${dimensions.rowCount} board`, () => {
  //         const model = makeGame(
  //           dimensions.columnCount,
  //           dimensions.rowCount,
  //           winNumber,
  //         )
  //         model.play()
  //         const grid = GridModel.fromRows(data)
  //         model.grid = grid
  //         model.lastPlacedPiece = new Chip(
  //           lastPlacedAt.x,
  //           lastPlacedAt.y,
  //           grid.at(lastPlacedAt.x, lastPlacedAt.y)!,
  //         )

  //         expect(model.outcome).toEqual({
  //           type: OutcomeType.Win,
  //           winner: winner,
  //         })
  //       })
  //     },
  //   )
  // })
})
