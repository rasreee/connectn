import { css } from '@emotion/react'
import styled from '@emotion/styled'

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

export const SubmitButton = styled.button(
  ({ theme }) =>
    css`
      flex: 1;
      color: #fff;
      background: ${theme.colors.primary['500']};
      padding: 0.75rem 1.5rem;
      border-radius: ${theme.radii.full};
      font-weight: ${theme.fontWeights.semibold};

      font-size: ${theme.fontSizes.lg};
    `,
)

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

export const Input = styled.input(
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
