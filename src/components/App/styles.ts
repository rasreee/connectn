import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div(
  css`
    flex: 1;
    max-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    gap: 1.25rem;
    margin: 0 auto;
    padding: 2rem 0;
  `,
)

export const Heading = styled.h1(
  ({ theme }) => css`
    text-transform: uppercase;
    color: ${theme.colors.primary[600]};
    font-weight: ${theme.fontWeights.extrabold};

    & span.winNumber {
      color: ${theme.colors.red[500]};
      font-weight: ${theme.fontWeights.extrabold};
    }
  `,
)
