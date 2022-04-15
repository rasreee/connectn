import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, RefObject } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef(
  (props: InputProps, ref: RefObject<HTMLInputElement>) => {
    return <StyledInput {...props} ref={ref} />
  },
)

const StyledInput = styled.input(
  ({ theme }) => css`
    color: ${theme.colors.gray['800']};

    &:placeholder {
      color: ${theme.colors.gray['500']};
    }
    padding: 0.325rem 0.5rem;
    border-radius: ${theme.radii.md};
    border: 1px solid ${theme.colors.gray['300']};
  `,
)
