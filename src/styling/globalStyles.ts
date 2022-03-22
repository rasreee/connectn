import { css } from '@emotion/react'
import { theme } from 'styling/theme'

export const globalStyles = css`
  * {
    line-height: ${theme.lineHeights.none};
    text-align: left;
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  button {
    background: unset;
    border: none;
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  button[disabled],
  button[aria-disabled='true'],
  button[data-disabled] {
    cursor: default;
  }

  input[type='number'] {
    width: max-content;
    max-width: max-content !important;
  }
`
