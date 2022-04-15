import {
  defaultSettings,
  ensurePlayerType,
  GameSettings,
  GameStatus,
  Outcome,
  OutcomeType,
  Player,
} from 'lib/game'
import { updateWithJSON } from 'lib/object'
import { Maybe } from 'lib/types'
import { action, computed, makeObservable, observable } from 'mobx'
import { Chip } from 'models/chip.model'
import { GridModel } from 'models/grid.model'

export type GameModelInit = Partial<Omit<GameModel, 'settings'>> & {
  settings?: Partial<GameSettings>
}

const toDefaultGameModelData = ({
  settings: _settings = {},
  currentPlayer = null,
  outcome = null,
  grid: _grid,
  status = GameStatus.InProgress,
}: GameModelInit) => {
  const settings = { ...defaultSettings, ..._settings }
  const grid = _grid ?? new GridModel(settings.columnCount, settings.rowCount)
  return { grid, settings, currentPlayer, outcome, status }
}

export class GameModel {
  grid: GridModel
  currentPlayer: Maybe<Player>
  lastPlacedPiece: Maybe<Chip>
  status: GameStatus
  outcome: Maybe<Outcome>
  settings: GameSettings

  initializeWithSettings = (settings: Partial<GameSettings> = {}) => {
    updateWithJSON(this, toDefaultGameModelData({ settings }))
  }

  play = () => {
    this.status = GameStatus.InProgress
    this.currentPlayer = Player.PlayerOne
  }

  restart = (settings: Partial<GameSettings> = {}) => {
    this.initializeWithSettings(settings)
    this.play()
  }

  endGame = (reason: OutcomeType, winner?: Player) => {
    this.outcome = { type: reason, winner }
    this.status = GameStatus.Complete
    this.currentPlayer = null
  }

  switchPlayer = () => {
    const nextPlayer =
      this.currentPlayer === Player.PlayerTwo
        ? Player.PlayerOne
        : Player.PlayerTwo
    this.currentPlayer = nextPlayer
  }

  endTurn = () => {
    if (this.status !== GameStatus.InProgress || !this.currentPlayer) return
    this.switchPlayer()
  }

  placeChip = (column: number) => {
    const player = ensurePlayerType(this.currentPlayer)
    const chip = new Chip(column, -1, player)
    const placedNode = this.grid.placeNode({ node: chip, column })

    if (placedNode) {
      this.lastPlacedPiece = placedNode
      this.maybeUpdateOutcome()
      this.endTurn()
    }
  }

  maybeUpdateOutcome = () => {
    if (this.grid.isFull) return this.endGame(OutcomeType.Draw)

    if (!this.lastPlacedPiece) return

    const line = this.grid.getConnection(
      this.lastPlacedPiece,
      this.settings.winNumber,
    )

    if (line) {
      const winner = this.lastPlacedPiece.value
      this.endGame(OutcomeType.Win, winner)
    }
  }

  getPlayerName = (player: Player): string =>
    computed(() => {
      return player === Player.PlayerOne
        ? this.settings.playerOneName
        : this.settings.playerTwoName
    }).get()

  constructor(initData: GameModelInit = {}) {
    updateWithJSON(this, toDefaultGameModelData(initData))
    makeObservable(this, {
      grid: observable.deep,
      currentPlayer: observable,
      lastPlacedPiece: observable,
      status: observable,
      outcome: observable,
      settings: observable,
      restart: action,
      play: action,
      endGame: action,
      endTurn: action,
      placeChip: action,
      maybeUpdateOutcome: action,
      initializeWithSettings: action,
    })
  }
}
