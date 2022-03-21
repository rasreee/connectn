import { Grid } from './grid'
import { Player } from './player'

export interface Slot {
  column: number
  row: number
}

export type Board = Grid<Player>
