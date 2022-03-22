import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getFormData } from 'lib/form'
import { GameInfo } from 'lib/game'
import { useRef } from 'react'

import { BoardSetup, PlayerSetup } from './GameSetupForm.partials'

export const GameSetupForm = ({
  initialGameInfo,
  onSubmit,
}: {
  initialGameInfo: GameInfo
  onSubmit: (data: GameInfo) => void
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = formRef.current
    if (!formElement)
      throw new Error('failed to submit form because formRef.current was null')

    const data = getFormData(formElement, initialGameInfo)
    onSubmit(data)
  }

  return (
    <>
      <FormHeader>
        <div className='form-title'>Game Setup</div>
      </FormHeader>
      <form ref={formRef} onSubmit={handleSubmit}>
        <PlayerSetup
          playerOneName={initialGameInfo.playerOneName}
          playerTwoName={initialGameInfo.playerTwoName}
        />
        <BoardSetup
          columnCount={initialGameInfo.columnCount}
          rowCount={initialGameInfo.rowCount}
          winNumber={initialGameInfo.winNumber}
        />
        <FormFooter>
          <SubmitButton type='submit'>Start Game</SubmitButton>
        </FormFooter>
      </form>
    </>
  )
}

const sharedPadding = css`
  padding: 0.75rem 1.25rem;
`

const FormHeader = styled.div(
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  css`
    ${sharedPadding}
    padding-left: 1.5rem;
  `,
  ({ theme }) => css`
    &.form-title {
      font-size: ${theme.fontSizes['2xl']};
      font-weight: ${theme.fontWeights.semibold};
    }
  `,
)

const FormFooter = styled.div``

const SubmitButton = styled.button(
  ({ theme }) =>
    css`
      color: #fff;
      background: ${theme.colors.primary['500']};
    `,
)
