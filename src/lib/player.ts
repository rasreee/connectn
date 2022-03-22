export enum Player {
  None = 0,
  PlayerOne = 1,
  PlayerTwo = 2,
}

export const PlayerColor = {
  PlayerOne: 'red',
  PlayerTwo: 'black',
}

export const isPlayer = (o: any): o is Player => {
  return [1, 2].includes(o)
}

export const getPlayerColor = (player: Player) =>
  player === Player.PlayerOne ? PlayerColor.PlayerOne : PlayerColor.PlayerTwo

export const getNextPlayer = (currentPlayer: Player): Player =>
  currentPlayer === Player.PlayerOne ? Player.PlayerTwo : Player.PlayerOne
