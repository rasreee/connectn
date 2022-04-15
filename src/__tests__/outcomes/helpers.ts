import fs from 'fs'
import { Chip } from 'models/chip.model'
import { Matrix } from 'models/matrix.model'
import path from 'path'

type OutcomeFixtureJson = {
  winNumber: number
  lastPlacedPiece: Chip
  matrix: Matrix
}

const getOutcomeFixtures = (): OutcomeFixtureJson[] => {
  const filePath = path.resolve(__dirname, '../outcomeFixtures/wins.json')
  return JSON.parse(
    fs.readFileSync(filePath).toString(),
  ) as OutcomeFixtureJson[]
}

type OutcomeFixture = [number, Chip, Matrix]

export const outcomeFixtures: OutcomeFixture[] = getOutcomeFixtures().map(
  (outcomefixture) => [
    outcomefixture.winNumber,
    outcomefixture.lastPlacedPiece,
    outcomefixture.matrix,
  ],
)
