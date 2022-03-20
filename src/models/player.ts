export enum Player {
  PlayerOne,
  PlayerTwo,
  None,
}

export const getPlayerColor = (player: Player) =>
  player === Player.PlayerOne ? 'red' : 'black';
