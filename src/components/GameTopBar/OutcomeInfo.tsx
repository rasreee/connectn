import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Piece } from 'components/Piece'
import { Outcome, OutcomeType, Player } from 'lib/game'
import { Maybe } from 'lib/types'

export interface OutcomeInfoProps {
  outcome: Outcome
  currentPlayer: Maybe<Player>
}

export const OutcomeInfo = ({ outcome, currentPlayer }: OutcomeInfoProps) => {
  let content = <></>

  switch (outcome.type) {
    case OutcomeType.Draw:
      content = <span>Draw!</span>
      break
    case OutcomeType.Win: {
      content = (
        <div>
          {currentPlayer && <Piece player={currentPlayer} />}
          {' is winner!'}
        </div>
      )
      break
    }
  }

  return <Container outcomeType={outcome.type}>{content}</Container>
}

const Container = styled.div<{ outcomeType: OutcomeType }>(
  ({ theme, outcomeType }) => css`
    display: flex;
    align-items: center;
    gap: 0.325rem;
    padding: 0.325rem 0.5rem;

    --outcome-color: ${outcomeType === OutcomeType.Draw
      ? theme.colors.orange[500]
      : theme.colors.green[500]};

    color: var(--outcome-color);
    border: 2px solid var(--outcome-color);
    border-radius: ${theme.radii.lg};

    & span {
      font-size: ${theme.fontSizes.lg};
    }
  `,
)
