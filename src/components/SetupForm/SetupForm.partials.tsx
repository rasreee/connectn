import { Input } from 'components/Input'
import {
  defaultGameInfo,
  GameSettings,
  MIN_SIDE_LENGTH,
  MIN_WIN_NUMBER,
} from 'lib/game'
import { Dimensions } from 'lib/grid'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { FormInputRow, FormSection, InputCaption } from './styles'

// form for player setup
export const PlayerSetup = ({
  playerOneName,
  playerTwoName,
  setFormData,
}: {
  playerOneName: string
  playerTwoName: string
} & {
  setFormData: Dispatch<SetStateAction<GameSettings>>
}) => {
  const playerOneNameInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    playerOneNameInputRef.current?.focus()
  }, [])

  const onChange =
    (name: 'playerOneName' | 'playerTwoName') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

  return (
    <FormSection>
      <InputCaption>Who's playing?</InputCaption>
      <FormInputRow>
        <Input
          ref={playerOneNameInputRef}
          autoFocus
          type='text'
          name='playerOneName'
          placeholder={defaultGameInfo.playerOneName}
          defaultValue={playerOneName}
          onChange={onChange('playerOneName')}
        />
        <Input
          type='text'
          name='playerTwoName'
          placeholder={defaultGameInfo.playerTwoName}
          defaultValue={playerTwoName}
          onChange={onChange('playerTwoName')}
        />
      </FormInputRow>
    </FormSection>
  )
}

const getMaxWinNumber = ({ columnCount, rowCount }: Dimensions): number =>
  Math.min(columnCount, rowCount)

// form for board setup
export const BoardSetup = ({
  columnCount,
  rowCount,
  winNumber,
  setFormData,
}: {
  winNumber: number
} & Dimensions & {
    setFormData: Dispatch<SetStateAction<GameSettings>>
  }) => {
  const onChange =
    (name: 'columnCount' | 'rowCount' | 'winNumber') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

  return (
    <>
      <FormSection>
        <InputCaption>Board dimensions</InputCaption>
        <FormInputRow>
          <Input
            type='number'
            name='columnCount'
            defaultValue={columnCount}
            min={MIN_SIDE_LENGTH}
            onChange={onChange('columnCount')}
          />
          <div>x</div>
          <Input
            type='number'
            name='rowCount'
            defaultValue={rowCount}
            min={MIN_SIDE_LENGTH}
            onChange={onChange('rowCount')}
          />
        </FormInputRow>
      </FormSection>
      <FormSection>
        <InputCaption>How many in a row to win?</InputCaption>
        <FormInputRow>
          <Input
            type='number'
            name='winNumber'
            defaultValue={winNumber}
            min={MIN_WIN_NUMBER}
            max={getMaxWinNumber({ columnCount, rowCount })}
            onChange={onChange('winNumber')}
          />
        </FormInputRow>
      </FormSection>
    </>
  )
}
