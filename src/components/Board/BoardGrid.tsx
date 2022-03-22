import styled from '@emotion/styled'
import { Dimensions, Slot } from 'lib/grid'
import times from 'lodash.times'

export interface BoardGridProps extends Dimensions {
  onSlotClick: (slot: Slot) => void
}

export const BoardGrid = ({
  columnCount,
  rowCount,
  onSlotClick,
}: BoardGridProps) => {
  const handleSlotClick = (slot: Slot) => () => {
    const { column, row } = slot
    const normalizedRow = rowCount - row - 1

    onSlotClick({ column, row: normalizedRow })
  }

  return (
    <>
      {times(rowCount, (row) => (
        <BoardRow key={`BoardRow-${row}`}>
          {times(columnCount, (column) => (
            <BoardSlot
              key={`slot-${column}-${row}`}
              role={`slot-${column}-${row}`}
              onClick={handleSlotClick({ column, row })}
            />
          ))}
        </BoardRow>
      ))}
    </>
  )
}

const BoardRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  flex: 1;
  border-bottom: 1px solid #000;

  &:last-of-type {
    border-right: none;
  }
`

const BoardSlot = styled.div`
  flex: 1;
  border-right: 1px solid #000;
`