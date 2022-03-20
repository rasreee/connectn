import { Player } from './player';
import { Slot } from './slot';

export interface PieceData {
  column: number;
  row: number;
  player: Player;
}

export class Piece implements PieceData {
  column: number;
  row: number;
  player: Player;

  constructor(column: number, row: number, player: Player = Player.None) {
    this.column = column;
    this.row = row;
    this.player = player;
  }

  get slot(): Slot {
    return { column: this.column, row: this.row };
  }

  isAdjacentTo = (target: Slot): boolean => {
    const aValues = this.slot;
    const xDel = Math.abs(aValues.row - target.row);
    const yDel = Math.abs(aValues.column - target.column);
    return (
      (xDel === 1 && yDel === 0) ||
      (yDel === 1 && xDel === 0) ||
      (yDel === 1 && xDel === 1)
    );
  };

  isEqualTo = (point: Piece): boolean =>
    this.slot.row === point.slot.row && this.slot.column === point.slot.column;

  isAt = (target: Slot): boolean => {
    return this.column === target.column && this.row === target.row;
  };
}
