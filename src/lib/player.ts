export enum Player {
  PlayerOne,
  PlayerTwo
}

export enum MaybePlayer {
  None,
  PlayerOne,
  PlayerÎATwo
}

export const isPlayer = (o: any): o is Player => {
  return typeof o === 'number' && [1, 2].includes(o);
};

export const getPlayerColor = (player: Player) => player === Player.PlayerOne ? 'red' : 'black';