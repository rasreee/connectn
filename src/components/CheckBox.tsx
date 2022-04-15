import { css } from '@emotion/react'
import styled from '@emotion/styled'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  caption: string
  onChange?: (value: boolean) => void
}

export const CheckBox = ({
  readOnly = false,
  caption,
  onChange,
  ...props
}: CheckBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    onChange(e.currentTarget.checked)
  }

  return (
    <Container>
      <CheckBoxInput
        type='checkbox'
        readOnly={readOnly}
        {...props}
        onChange={handleChange}
      />
      <Label htmlFor='rememberSettings'>{caption}</Label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CheckBoxInput = styled.input(
  ({ theme }) => css`
    height: 1rem;
    width: 1rem;
    border-radius: ${theme.radii.base};
    border: 1px solid ${theme.colors.gray[300]};
    color: ${theme.colors.primary[600]};
    &:focus {
      border: 1px solid ${theme.colors.primary[500]};
    }
  `,
)

const Label = styled.label(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.sm};
  `,
)
