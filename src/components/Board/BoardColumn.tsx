import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Piece } from 'components/Piece'
import { useRootStore } from 'components/RootStoreContext'
import { reversed } from 'lib/array'
import { isPlayer, Player } from 'lib/game'
import { Dimensions, getYCoordinateFromRow } from 'lib/grid'
import { Maybe } from 'lib/types'
import times from 'lodash.times'

import { DropAnimation } from './DropAnimation'
import { Slot } from './Slot'

const getTranslateYForRow = (row: number, rowCount: number) => {
  const y = getYCoordinateFromRow({ row, rowCount })

  return `${(rowCount - y) * 100}%`
}

const fillPieces = (
  pieces: Player[],
  dimensions: Dimensions,
): Maybe<Player>[] => {
  const countMissingPieces = dimensions.rowCount - pieces.length
  const missingPieces = times(countMissingPieces, () => null)
  return [...pieces, ...missingPieces]
}

export interface BoardColumnProps {
  onMouseOver: () => void
  onClick: () => void
  columnIndex: number
  rowCount: number
  pieces: Player[]
}

export const BoardColumn = ({
  onMouseOver,
  onClick,
  columnIndex,
  rowCount,
  pieces,
}: BoardColumnProps) => {
  const store = useRootStore()

  return (
    <Container role={`BoardColumn-${columnIndex}`} onMouseOver={onMouseOver}>
      {reversed(fillPieces(pieces, store.game.grid.dimensions)).map(
        (cell, rowIndex) => (
          <DropAnimation
            key={`Slot-${columnIndex}-${rowIndex}`}
            shouldPlay={isPlayer(cell)}
            translateY={getTranslateYForRow(rowIndex, rowCount)}
          >
            <Slot
              role={`Slot-${columnIndex}-${rowIndex}`}
              onClick={onClick}
              as='button'
            >
              {cell && (
                <Piece
                  role={`Piece-${columnIndex}-${rowIndex}`}
                  player={cell}
                />
              )}
            </Slot>
          </DropAnimation>
        ),
      )}
    </Container>
  )
}

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    padding: 0px;
    margin: 0px;
    display: inline-block;
    border-right: 1px solid ${theme.colors.gray[500]};

    &:last-of-type {
      border-right: none;
    }
  `,
)
