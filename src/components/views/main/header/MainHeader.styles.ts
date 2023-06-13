import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Heading = styled.div(
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
