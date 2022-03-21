import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Dimensions, Slot } from 'lib/board'
import { GameInfo, GameState, getDimensions } from 'lib/game'
import { getPlayerColor, isPlayer } from 'lib/player'

import { BoardGrid } from './BoardGrid'
import { BoardPiece } from './BoardPiece'

interface BoardProps {
  gameInfo: GameInfo
  gameState: GameState
  onSlotClick: (slot: Slot) => void
}

export const Board = ({ gameInfo, gameState, onSlotClick }: BoardProps) => {
  const renderPieces = () => {
    return gameState.board.map((column, columnIndex) =>
      column.map(
        (value, rowIndex) =>
          isPlayer(value) && (
            <BoardPiece
              key={`col${columnIndex}-row${rowIndex}`}
              gameInfo={gameInfo}
              column={columnIndex}
              row={columnIndex}
              color={getPlayerColor(value)}
            />
          ),
      ),
    )
  }

  return (
    <SBoard {...getDimensions(gameInfo)}>
      {renderPieces()}
      <BoardGrid
        rowCount={gameInfo.rowCount}
        columnCount={gameInfo.columnCount}
        onSlotClick={onSlotClick}
      />
    </SBoard>
  )
}

const SBoard = styled.div<Dimensions>(
  css`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 20px;
    border: 1px solid #000;
  `,
  ({ columnCount, rowCount }) =>
    css`
      width: ${columnCount * 50}px;
      height: ${rowCount * 50}px;
    `,
)
