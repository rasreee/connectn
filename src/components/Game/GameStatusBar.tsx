import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useGameInfo } from 'contexts/GameInfoContext'
import { GameState } from 'lib/game'
import { findWinner, isDrawn } from 'lib/outcome'
import { getPlayerColor, isPlayer, Player } from 'lib/player'

export const GameStatusBar = ({ gameState }: { gameState: GameState }) => {
  const { currentPlayer, board, lastPlacedPiece } = gameState
  const { gameInfo } = useGameInfo()

  const getPlayerName = (player: Player) => {
    return player === Player.PlayerOne
      ? gameInfo.playerOneName
      : gameInfo.playerTwoName
  }

  const renderContent = () => {
    const winner = findWinner(board, lastPlacedPiece, gameInfo.winNumber)

    if (isPlayer(winner)) return <>{getPlayerName(winner)}</>

    if (isDrawn(board)) return <>Draw!</>

    return (
      <>
        <Circle color={getPlayerColor(currentPlayer)} />
        <span>
          <Strong color={getPlayerColor(currentPlayer)}>
            {getPlayerName(currentPlayer)}
          </Strong>
          's turn
        </span>
      </>
    )
  }

  return <Container>{renderContent()}</Container>
}

const Container = styled.div(
  css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
)

const Circle = styled.div<{ color: string }>(
  ({ color, theme }) => css`
    height: 1.25rem;
    width: 1.25rem;
    background-color: ${color};
    border-radius: ${theme.radii.full};
  `,
)

const Strong = styled.strong<{ color: string }>(
  ({ color }) => css`
    strong {
      color: ${color};
    }
  `,
)
