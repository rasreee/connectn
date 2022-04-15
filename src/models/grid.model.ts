import { Player } from 'lib/game'
import {
  Dimensions,
  DirectionType,
  DirectionVector,
  emptyBoard,
  getDirectionVectors,
  iterateCoordinates,
} from 'lib/grid'
import { Maybe } from 'lib/types'
import { makeAutoObservable } from 'mobx'

import { Chip } from './chip.model'
import { GridNode } from './node.model'

export class GridModel {
  columns: Player[][]

  constructor(readonly columnCount: number, readonly rowCount: number) {
    this.columns = emptyBoard(columnCount)
    makeAutoObservable(this)
  }

  get dimensions(): Dimensions {
    const { columnCount, rowCount } = this
    return { columnCount, rowCount }
  }

  placeNode = ({
    node,
    column: columnIndex,
  }: {
    node: GridNode<Player>
    column: number
  }): Maybe<GridNode<Player>> => {
    if (
      columnIndex >= this.columnCount ||
      this.columns[columnIndex].length === this.columnCount
    ) {
      return null
    }

    const column = this.columns[columnIndex].slice()
    column.push(node.value)
    this.columns[columnIndex] = column

    return new GridNode<Player>(
      columnIndex,
      this.columns[columnIndex].length - 1,
      node.value,
    )
  }

  get isFull(): boolean {
    return this.columns.every((column) => column.length === this.rowCount)
  }

  isOutOfBounds = (x: number, y: number): boolean =>
    x < 0 || x >= this.columnCount || y < 0 || y >= this.rowCount

  at = (x: number, y: number): Maybe<Player> => {
    const column = this.columns[x]

    if (this.isOutOfBounds(x, y) || y >= column.length) return null

    return column[y]
  }

  nextSlot = (
    x: number,
    y: number,
    direction: DirectionVector,
  ): [number, number] => {
    const nextCoords: [number, number] = iterateCoordinates(x, y, direction)

    return nextCoords
  }

  exploreDirection = (start: Chip, direction: DirectionVector): Chip[] => {
    const connection: Chip[] = []

    let currCoords = this.nextSlot(start.x, start.y, direction)
    let currChip = this.at(...currCoords)
    while (currChip && currChip === start.value) {
      connection.push(new Chip(...currCoords, currChip))
      currCoords = this.nextSlot(...currCoords, direction)
      currChip = this.at(...currCoords)
    }

    return connection
  }

  getConnection = (startChip: Chip, minLength: number): Chip[] | null => {
    let result: Chip[] | null = null

    for (const directionType of Object.values(DirectionType)) {
      const { positiveDirection, negativeDirection } =
        getDirectionVectors(directionType)

      const negativeDirectionResult = this.exploreDirection(
        startChip,
        negativeDirection,
      )

      // Don't search north of the last placed chip since it will be empty
      const positiveDirectionResult =
        directionType !== DirectionType.Vertical
          ? this.exploreDirection(startChip, positiveDirection)
          : []

      const connection = [
        ...negativeDirectionResult,
        startChip,
        ...positiveDirectionResult,
      ]

      if (connection.length >= minLength) {
        result = connection
        break
      }
    }

    return result
  }

  get isEmpty(): boolean {
    return this.columns.every((column) => column.length === 0)
  }
}
