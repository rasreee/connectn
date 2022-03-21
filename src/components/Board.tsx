import { Slot } from 'lib/board'
import { GameInfo, GameState } from 'lib/game'
import { getPlayerColor, isPlayer } from 'lib/player'
import React, { useEffect, useState } from 'react'

// TODO(3): style the game board
// - since pieces are dropped from the top, how can we animate that?
// - how would gravity affect a still-dropped piece?
// - how does the distance dropped affect the time it takes to land?
// - there is some boiler plate here to help, but feel free to go with a different approach if you are more comfortable
function BoardPiece(props: any) {
  const { color, column, gameInfo, row } = props

  const [isDropped, setIsDropped] = useState(false)

  const baseStyle = {
    color,
    top: 0,
    left: `${(column / gameInfo.columnCount) * 100}%`,
    height: `${(1 / gameInfo.rowCount) * 100}%`,
    width: `${(1 / gameInfo.columnCount) * 100}%`,
  }

  const droppedStyle = {
    ...baseStyle,
    top: `${100 - ((row + 1) / gameInfo.rowCount) * 100}%`,
  }

  // change the style chosen after it initially renders
  useEffect(() => {
    if (!isDropped) {
      setIsDropped(true)
    }
  }, [isDropped])

  return (
    <div className='Board-Piece' style={isDropped ? droppedStyle : baseStyle} />
  )
}

interface BoardProps {
  gameInfo: GameInfo
  gameState: GameState
  placePiece: (slot: Slot) => void
}

export const Board = ({ gameInfo, gameState, placePiece }: BoardProps) => {
  return (
    <div
      className='Board'
      style={{
        width: gameInfo.columnCount * 50,
        height: gameInfo.rowCount * 50,
      }}
    >
      {gameState.board.map((column, columnIndex) =>
        column.map(
          (value, rowIndex) =>
            isPlayer(value) && (
              <BoardPiece
                key={`col${columnIndex}-row${rowIndex}`}
                column={columnIndex}
                row={columnIndex}
                color={getPlayerColor(value)}
              />
            ),
        ),
      )}
      <BoardBackdrop
        rowCount={gameInfo.rowCount}
        columnCount={gameInfo.columnCount}
        placePiece={placePiece}
      />
    </div>
  )
}

export interface BoardBackdropProps {
  columnCount: number
  rowCount: number
  placePiece: (slot: Slot) => void
}

export const BoardBackdrop = ({
  columnCount,
  rowCount,
  placePiece,
}: BoardBackdropProps) => {
  const handleSlotClick = (slot: Slot) => () => {
    const { column, row } = slot
    const normalizedRow = rowCount - row - 1

    placePiece({ column, row: normalizedRow })
  }

  return (
    <>
      {Array.from(Array(rowCount), (e, row) => (
        <div key={`row-${row}`} className='Board-Row'>
          {Array.from(Array(columnCount), (e, column) => (
            <div
              key={`BoardSlot-${column}-${row}`}
              className='Board-BoardSlot'
              onClick={handleSlotClick({ column, row })}
            />
          ))}
        </div>
      ))}
    </>
  )
}
