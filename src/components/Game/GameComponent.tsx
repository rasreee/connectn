import styled from '@emotion/styled'
import { Board, HoveredColumnIndicator } from 'components/Board'
import { GameTopBar } from 'components/GameTopBar'
import { Modals } from 'components/modals'
import { useRootStore } from 'components/RootStoreContext'
import { when } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

// Component that holds the structure of the game
export const GameComponent = observer(function GameComponent() {
  const { game, ui } = useRootStore()

  const [hoveredColumn, setHoveredColumn] = useState<number>(-1)

  const hideHoveredColumnIndicator = () => {
    setHoveredColumn(-1)
  }

  useEffect(() => {
    return when(() => game.lastPlacedPiece !== null, hideHoveredColumnIndicator)
  }, [])

  return (
    <Container role='contentinfo'>
      <GameTopBar
        onResetClick={game.restart}
        onSettingsClick={() => ui.openModal(Modals.Settings)}
      />
      <BoardContainer>
        <HoveredColumnIndicator
          hoveredColumn={hoveredColumn}
          columnCount={game.settings.columnCount}
          currentPlayer={game.currentPlayer}
        />
        <Board
          grid={game.grid}
          onMouseLeave={hideHoveredColumnIndicator}
          onColumnHover={setHoveredColumn}
          onColumnClick={game.placeChip}
        />
      </BoardContainer>
    </Container>
  )
})

const Container = styled.div`
  text-align: center;
`

const BoardContainer = styled.div`
  display: inline-block;
  position: relative;
`
