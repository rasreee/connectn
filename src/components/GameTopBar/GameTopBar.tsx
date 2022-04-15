import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRootStore } from 'components/RootStoreContext'
import { ensurePlayerType, getPlayerColor } from 'lib/game'
import { observer } from 'mobx-react-lite'

import { CurrentPlayerInfo } from './CurrentPlayerInfo'
import { OutcomeInfo } from './OutcomeInfo'
import { ResetGameButton, SettingsButton } from './RightActions'

export interface GameTopBarProps {
  onSettingsClick: () => void
  onResetClick: () => void
}

export const GameTopBar = observer(function GameTopBar({
  onSettingsClick,
  onResetClick,
}: GameTopBarProps) {
  const { game } = useRootStore()

  let content = <></>

  if (!game.outcome) {
    const player = ensurePlayerType(game.currentPlayer)

    content = (
      <CurrentPlayerInfo
        color={getPlayerColor(player)}
        name={game.getPlayerName(player)}
      />
    )
  } else {
    content = (
      <OutcomeInfo outcome={game.outcome} currentPlayer={game.currentPlayer} />
    )
  }

  return (
    <Container>
      {content}
      <RightActions>
        <ResetGameButton disabled={game.grid.isEmpty} onClick={onResetClick} />
        <SettingsButton onClick={onSettingsClick} />
      </RightActions>
    </Container>
  )
})

const Container = styled.div(
  () => css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    padding-bottom: 1.5rem;
  `,
)

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
