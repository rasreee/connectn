import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const DROP_DURATION = 300

const getDropKeyframes = (translateY: string) => keyframes`
  0% {
    transform: translateY(-${translateY});
  }

  100% {
    transform: translateY(0%);
  }
`

export const DropAnimation = styled.div<{
  shouldPlay: boolean
  translateY: string
}>(
  css`
    position: relative;
  `,
  ({ shouldPlay, translateY }) =>
    shouldPlay &&
    css`
      animation: ${getDropKeyframes(translateY)} ${DROP_DURATION}ms linear;
    `,
)
