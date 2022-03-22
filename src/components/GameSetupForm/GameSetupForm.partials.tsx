import { defaultGameInfo } from 'lib/game'
import { Dimensions } from 'lib/grid'

import { FormInputRow, FormSection, Input, InputCaption } from './styles'

// form for player setup
export const PlayerSetup = ({
  playerOneName,
  playerTwoName,
}: {
  playerOneName: string
  playerTwoName: string
}) => {
  return (
    <FormSection>
      <InputCaption>Who's playing?</InputCaption>
      <FormInputRow>
        <Input
          type='text'
          name='playerOneName'
          placeholder={defaultGameInfo.playerOneName}
          defaultValue={playerOneName}
        />
        <Input
          type='text'
          name='playerTwoName'
          placeholder={defaultGameInfo.playerTwoName}
          defaultValue={playerTwoName}
        />
      </FormInputRow>
    </FormSection>
  )
}

// form for board setup
export const BoardSetup = ({
  columnCount,
  rowCount,
  winNumber,
}: {
  winNumber: number
} & Dimensions) => {
  return (
    <>
      <FormSection>
        <InputCaption>Board dimensions</InputCaption>
        <FormInputRow>
          <Input type='number' name='columnCount' defaultValue={columnCount} />
          <div>x</div>
          <Input type='number' name='rowCount' defaultValue={rowCount} />
        </FormInputRow>
      </FormSection>
      <FormSection>
        <InputCaption>How many in a row to win?</InputCaption>
        <FormInputRow>
          <Input type='number' name='winNumber' defaultValue={winNumber} />
        </FormInputRow>
      </FormSection>
    </>
  )
}
