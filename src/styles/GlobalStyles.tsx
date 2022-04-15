import { css, Global, useTheme } from '@emotion/react'

export const GlobalStyles = () => {
  const theme = useTheme()

  const globalStyles = css`
    :root {
      --font-body: 'Roboto', sans-serif;
    }

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
      font-family: var(--font-body);
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

    svg {
      height: 1.25rem;
      width: 1.25rem;
    }
  `

  return <Global styles={globalStyles} />
}
