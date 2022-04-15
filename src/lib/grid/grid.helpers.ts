import { Player } from 'lib/game'
import times from 'lodash.times'

export const getYCoordinateFromRow = ({
  row,
  rowCount,
}: {
  row: number
  rowCount: number
}): number => {
  return rowCount - row - 1
}

/**
 * Create empty board with the given width
 *
 * @param width Width of the grid
 */

export const emptyBoard = (width: number): Player[][] => times(width, () => [])
