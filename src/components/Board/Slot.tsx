import styled from '@emotion/styled'
import { PIECE_DIAMETER } from 'components/Piece'

export const SLOT_SIZE = PIECE_DIAMETER + 8

export const Slot = styled.div<{ disabled?: boolean }>`
  height: ${SLOT_SIZE}px;
  width: ${SLOT_SIZE}px;
`
