import { Board, HoverIndicator } from 'components/Board'
import { GameTopBar } from 'components/GameTopBar'
import { ModalName } from 'components/modals'
import { useRootStore } from 'components/RootStoreContext'
import { when } from 'mobx'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'

import * as S from './GameComponent.styles'

// Component that holds the structure of the game
export const GameComponent: FC = observer(() => {
  const { game, ui } = useRootStore()

  const [hoveredCol, setHoveredCol] = useState<number>(-1)

  const hideHoverIndicator = () => {
    setHoveredCol(-1)
  }

  useEffect(() => {
    return when(
      () => !!game.lastPlacedPiece,
      () => hideHoverIndicator(),
    )
  }, [])

  const showSettings = () => {
    ui.showModal(ModalName.Settings)
  }

  return (
    <S.Container role='contentinfo'>
      <GameTopBar onResetClick={game.restart} onSettingsClick={showSettings} />
      <S.BoardContainer>
        <HoverIndicator
          hoveredCol={hoveredCol}
          columnCount={game.settings.columnCount}
          currentPlayer={game.currentPlayer}
        />
        <Board
          grid={game.grid}
          onMouseLeave={hideHoverIndicator}
          onColumnHover={setHoveredCol}
          onColumnClick={game.placeChip}
        />
      </S.BoardContainer>
    </S.Container>
  )
})
