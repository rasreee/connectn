export const hoverNotDisabledPseudo = `&:hover:not(:disabled)`

import { css } from '@emotion/react'

export const transitionAllStyle = css`
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`
