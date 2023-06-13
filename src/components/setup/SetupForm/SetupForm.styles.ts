import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  hoverNotDisabledPseudo,
  StyledProps,
  transitionAllStyle,
} from 'lib/styling'

export const FormContainer = styled.div`
  padding: 0.5rem 2rem;
`

const sharedPadding = css`
  padding: 0.5rem 0;
`

export const Form = styled.form(
  css`
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
)

export const FormHeader = styled.div(
  sharedPadding,
  css`
    display: flex;
    align-items: center;
  `,
)

export const FormTitle = styled.div(
  ({ theme }) => css`
    font-size: ${theme.fontSizes['xl']};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray['800']};
  `,
)

export const FormBody = styled.div(
  sharedPadding,
  css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
)

export const FormFooter = styled.div(
  sharedPadding,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
)

const baseButtonStyle = ({ theme }: StyledProps) => css`
  ${transitionAllStyle}
  min-width: max-content;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 2.25rem;
  border-radius: ${theme.radii['xl']};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};

  &:disabled {
    background: ${theme.colors.gray['200']};
    color: ${theme.colors.gray['500']};
    opacity: 0.9;
    font-weight: ${theme.fontWeights.medium};
  }
`

const PrimaryButton = styled.button(
  baseButtonStyle,
  ({ theme }) =>
    css`
      color: #fff;
      background: ${theme.colors.primary['500']};
      ${hoverNotDisabledPseudo} {
        background: ${theme.colors.primary['600']};
      }
      &:focus {
        background: ${theme.colors.primary['700']};
      }
    `,
)

export const SubmitButton = styled(PrimaryButton)`
  flex: 1;
`

export const FormSection = styled.div(
  css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
)

export const InputCaption = styled.div()

export const FormInputRow = styled.div(
  css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 5px 0 10px;
  `,
  ({ theme }) => css`
    div {
      font-size: ${theme.fontSizes.xs};
    }

    input[type='number'] {
      width: 3rem;
    }
  `,
)
