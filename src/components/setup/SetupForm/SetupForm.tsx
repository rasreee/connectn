import { CheckBox } from 'components/CheckBox'
import { defaultGameInfo, GameSettings } from 'lib/game'
import { Maybe } from 'lib/types'
import { useRef, useState } from 'react'

import { BoardSetup, PlayerSetup } from './SetupForm.partials'
import {
  Form,
  FormBody,
  FormContainer,
  FormFooter,
  FormHeader,
  FormTitle,
  SubmitButton,
} from './SetupForm.styles'

export const SetupForm = ({
  initialData,
  title,
  submitButtonText,
  onSubmit,
}: {
  initialData: Maybe<GameSettings>
  title: string
  submitButtonText: string
  onSubmit: (data: GameSettings) => void
}) => {
  const [formData, setFormData] = useState({
    ...(initialData ?? { ...defaultGameInfo, rememberSettings: false }),
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChangeRememberSettings = (rememberSettings: boolean) => {
    setFormData((prev) => ({ ...prev, rememberSettings }))
  }

  return (
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormHeader>
          <FormTitle>{title}</FormTitle>
        </FormHeader>
        <FormBody>
          <PlayerSetup
            playerOneName={formData.playerOneName}
            playerTwoName={formData.playerTwoName}
            setFormData={setFormData}
          />
          <BoardSetup
            columnCount={formData.columnCount}
            rowCount={formData.rowCount}
            winNumber={formData.winNumber}
            setFormData={setFormData}
          />
          <CheckBox
            id='rememberSettings'
            name='rememberSettings'
            caption='Remember these settings'
            checked={formData.rememberSettings}
            onChange={handleChangeRememberSettings}
          />
        </FormBody>
        <FormFooter>
          <SubmitButton type='submit'>{submitButtonText}</SubmitButton>
        </FormFooter>
      </Form>
    </FormContainer>
  )
}
