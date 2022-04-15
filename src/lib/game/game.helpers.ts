import { Player, PlayerColor } from './game.constants'

export const isPlayer = (o: any): o is Player =>
  typeof o === 'number' && [1, 2].includes(o)

export const getPlayerColor = (player: Player) => {
  if (!isPlayer(player)) return ''

  return player === Player.PlayerOne
    ? PlayerColor.PlayerOne
    : PlayerColor.PlayerTwo
}

export const ensurePlayerType = (o: any): Player => {
  if (!isPlayer(o)) throw new Error(`Invalid value: ${o}`)

  return o
}
