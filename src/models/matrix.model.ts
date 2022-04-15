import { Player } from 'lib/game'

export class Matrix {
  columns: Player[][] = []
  constructor(initialColumns: Player[][]) {
    this.columns = initialColumns.slice()
  }
}
