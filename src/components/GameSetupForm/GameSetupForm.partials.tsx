import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Dimensions } from 'lib/grid'

const FormSection = styled.div(
  css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  ({ theme }) => css`
    &.form-section-title {
      font-weight: ${theme.fontWeights.medium};
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.none};
      text-align: left;
    }

    &.form-input-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 5px 0 10px;
    }
  `,
)

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
      <div className='form-section-title'>Who's playing?</div>
      <div className='form-input-row'>
        <input type='text' name='playerOneName' defaultValue={playerOneName} />
        <input type='text' name='playerTwoName' defaultValue={playerTwoName} />
      </div>
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
    <FormSection>
      <div>
        <div className='form-section-title'>Board dimensions</div>
        <div>
          <div className='form-input-row'>
            <input
              type='number'
              name='columnCount'
              defaultValue={columnCount}
            />
            <div>x</div>
            <input type='number' name='rowCount' defaultValue={rowCount} />
          </div>
        </div>
        <div className='form-section-title'>How many in a row to win?</div>
        <div className='form-input-row'>
          <input type='number' name='winNumber' defaultValue={winNumber} />
        </div>
      </div>
    </FormSection>
  )
}
