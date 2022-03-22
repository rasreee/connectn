import { css } from '@emotion/react'

export const globalStyles = css`
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
`
