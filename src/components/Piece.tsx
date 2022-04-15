import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getPlayerColor, Player } from 'lib/game'

export interface PieceProps {
  player: Player
}

export const PIECE_DIAMETER = 44

export const Piece = styled.div<PieceProps>(
  ({ player, theme }) =>
    css`
      color: ${getPlayerColor(player)};
      background: currentColor;
      height: ${PIECE_DIAMETER}px;
      width: ${PIECE_DIAMETER}px;
      border-radius: ${theme.radii.full};
    `,
)
