export enum DirectionType {
  Vertical = 'Vertical',
  Horizontal = 'Horizontal',
  Diagonal = 'Diagonal',
}

export type DirectionVector = [number, number]

export const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
  UpRight: 'UpRight',
  UpLeft: 'UpLeft',
  DownRight: 'DownRight',
  DownLeft: 'DownLeft',
} as const

export type DirectionKey = keyof typeof Direction

const AllDirections: Record<DirectionKey, DirectionVector> = {
  [Direction.Up]: [0, 1],
  [Direction.Down]: [0, -1],
  [Direction.Left]: [-1, 0],
  [Direction.Right]: [1, 0],
  [Direction.UpRight]: [1, 1],
  [Direction.UpLeft]: [1, -1],
  [Direction.DownRight]: [-1, 1],
  [Direction.DownLeft]: [-1, -1],
}

export const PositiveDirections: Record<DirectionType, DirectionVector> = {
  [DirectionType.Vertical]: AllDirections.Up,
  [DirectionType.Horizontal]: AllDirections.Right,
  [DirectionType.Diagonal]: AllDirections.UpRight,
}

export const getDirectionVectors = (
  directionType: DirectionType,
): {
  positiveDirection: DirectionVector
  negativeDirection: DirectionVector
} => {
  const positiveDirection = PositiveDirections[directionType]

  const negativeDirection = getOppositeDirection(positiveDirection)

  return { positiveDirection, negativeDirection }
}

export const getVector = (Direction: DirectionKey): DirectionVector => {
  return AllDirections[Direction]
}

export const getOppositeDirection = (
  direction: DirectionVector,
): DirectionVector => {
  return [direction[0] * -1, direction[1] * -1]
}

export const iterateCoordinates = (
  x: number,
  y: number,
  direction: DirectionVector,
): [number, number] => {
  return [x + direction[0], y + direction[1]]
}
