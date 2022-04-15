import { css } from '@emotion/react'
import styled from '@emotion/styled'
import times from 'lodash.times'
import { observer } from 'mobx-react-lite'
import { GridModel } from 'models/grid.model'

import { BoardColumn } from './BoardColumn'

export interface BoardProps {
  grid: GridModel
  onMouseLeave: () => void
  onColumnClick: (column: number) => void
  onColumnHover: (column: number) => void
}

export const Board = observer(function Board({
  grid,
  onMouseLeave,
  onColumnHover,
  onColumnClick,
}: BoardProps) {
  const dimensions = grid.dimensions

  return (
    <GridContainer onMouseLeave={onMouseLeave} role='board'>
      {times(dimensions.columnCount, (columnIndex) => {
        if (columnIndex < 0 || columnIndex >= dimensions.columnCount)
          throw new Error(`columnIndex out of range: ${columnIndex}`)

        const pieces = grid.columns[columnIndex].slice()

        return (
          <BoardColumn
            key={`board-column-${columnIndex}`}
            pieces={pieces}
            columnIndex={columnIndex}
            rowCount={grid.rowCount}
            onMouseOver={() => onColumnHover(columnIndex)}
            onClick={() => onColumnClick(columnIndex)}
          />
        )
      })}
    </GridContainer>
  )
})

const GridContainer = styled.div(
  css`
    display: inline-block;
    position: relative;
  `,
  ({ theme }) =>
    css`
      border: 1px solid ${theme.colors.gray[800]};
    `,
)
