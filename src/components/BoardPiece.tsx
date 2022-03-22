// TODO(3): style the game board
// - since pieces are dropped from the top, how can we animate that?
// - how would gravity affect a still-dropped piece?
// - how does the distance dropped affect the time it takes to land?

import styled from '@emotion/styled'
import { useGame } from 'game/GameContext'
import { Slot } from 'lib/board'
import { useEffect, useState } from 'react'

export interface BoardPieceProps extends Slot {
  color: string
}

// - there is some boiler plate here to help, but feel free to go with a different approach if you are more comfortable
export const BoardPiece = (props: BoardPieceProps) => {
  const { color, column, row } = props
  const { gameInfo } = useGame()
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
    <SBoardPiece
      role={`piece-${column}-${row}`}
      style={isDropped ? droppedStyle : baseStyle}
    />
  )
}

const SBoardPiece = styled.div`
  position: absolute;
  background-color: currentColor;
  pointer-events: none;
`
