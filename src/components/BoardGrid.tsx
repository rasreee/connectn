import styled from '@emotion/styled'
import { Dimensions, Slot } from 'lib/board'

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
      {Array.from(Array(rowCount), (e, row) => (
        <BoardRow key={`row-${row}`}>
          {Array.from(Array(columnCount), (e, column) => (
            <BoardSlot
              key={`slot-${column}-${row}`}
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
