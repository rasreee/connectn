import { getFormData } from 'lib/form'
import { GameInfo } from 'lib/game'
import { useRef } from 'react'

import { BoardSetup, PlayerSetup } from './GameSetupForm.partials'
import {
  Form,
  FormBody,
  FormContainer,
  FormFooter,
  FormHeader,
  FormTitle,
  SubmitButton,
} from './styles'

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
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormHeader>
          <FormTitle>Game Setup</FormTitle>
        </FormHeader>
        <FormBody>
          <PlayerSetup
            playerOneName={initialGameInfo.playerOneName}
            playerTwoName={initialGameInfo.playerTwoName}
          />
          <BoardSetup
            columnCount={initialGameInfo.columnCount}
            rowCount={initialGameInfo.rowCount}
            winNumber={initialGameInfo.winNumber}
          />
        </FormBody>
        <FormFooter>
          <SubmitButton type='submit'>Start Game</SubmitButton>
        </FormFooter>
      </Form>
    </FormContainer>
  )
}
