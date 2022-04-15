import { css } from '@emotion/react'
import styled from '@emotion/styled'

export interface CircleProps {
  color: string
  size?: number
}

export const Circle = styled.div<CircleProps>(
  ({ color, theme, size = 40 }) =>
    css`
      background: ${color};
      height: ${size}px;
      width: ${size}px;
      border-radius: ${theme.radii.full};
    `,
)
