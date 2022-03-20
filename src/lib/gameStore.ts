import { DEFAULT_GAME_INFO, GameInfo } from './gameInfo';
import { Grid } from './matrix';

export enum Player {
  One,
  Two,
}

type PointData = Player | null;

export class GameStore extends Grid<PointData> {
  currentPlayer: Player | null = Player.One;
  playerOneName: string;
  playerTwoName: string;
  winNumber: number;

  constructor(settings: GameInfo = DEFAULT_GAME_INFO) {
    super(settings.dimensions);
    this.playerOneName = settings.playerOneName;
    this.playerTwoName = settings.playerTwoName;
    this.winNumber = settings.winNumber;
  }
}
