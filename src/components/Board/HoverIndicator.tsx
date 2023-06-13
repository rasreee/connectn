import styled from '@emotion/styled'
import { Piece } from 'components/Piece'
import { Player } from 'lib/game'
import { Maybe } from 'lib/types'
import times from 'lodash.times'

import { DROP_DURATION } from './DropAnimation'
import { Slot } from './Slot'

type HoverIndicatorProps = {
  hoveredCol: number
  columnCount: number
  currentPlayer: Maybe<Player>
}

export const HoverIndicator = ({
  hoveredCol,
  columnCount,
  currentPlayer,
}: HoverIndicatorProps) => {
  return (
    <Container>
      {times(columnCount, (col) => (
        <Slot key={`HoverIndicator-Slot-col${col}`}>
          {currentPlayer && (
            <Piece
              player={currentPlayer}
              style={{
                opacity: hoveredCol !== col ? 0 : 1,
                transition: `transform ${DROP_DURATION}ms ease-in`,
              }}
            />
          )}
        </Slot>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0.5rem 0;
`
