import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GameInfo, GameState } from 'lib/game'
import { Dimensions, Slot } from 'lib/grid'
import { getPlayerColor, isPlayer, Player } from 'lib/player'

import { BoardGrid } from './BoardGrid'
import { BoardPiece } from './BoardPiece'

interface BoardProps {
  gameInfo: GameInfo
  gameState: GameState
  onSlotClick: (slot: Slot) => void
}

interface BoardColumnProps {
  column: number
  data: Player[]
}

const BoardColumn = ({ column, data }: BoardColumnProps) => {
  return (
    <>
      {data.map(
        (value, rowIndex) =>
          isPlayer(value) && (
            <BoardPiece
              key={`BoardPiece-${column}-${rowIndex}`}
              column={column}
              row={rowIndex}
              color={getPlayerColor(value)}
            />
          ),
      )}
    </>
  )
}

export const Board = ({ gameInfo, gameState, onSlotClick }: BoardProps) => {
  return (
    <SBoard columnCount={gameInfo.columnCount} rowCount={gameInfo.rowCount}>
      {gameState.board.map((data, column) => (
        <BoardColumn
          key={`BoardColumn-${column}`}
          column={column}
          data={data}
        />
      ))}
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
