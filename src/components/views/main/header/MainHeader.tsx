import { GitHubIcon } from 'components/icons/GitHubIcon'
import { useRootStore } from 'components/RootStoreContext'
import { ExternalLink } from 'components/ui/ExternalLink'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import * as S from './MainHeader.styles'

export const MainHeader: FC = observer(() => {
  const { game } = useRootStore()

  return (
    <header>
      <S.Heading>
        <span>Connect-</span>
        <span className='winNumber'>{game.settings.winNumber}</span>
      </S.Heading>
      <div>
        <ExternalLink href='https://github.com/rasreee/connectn'>
          <GitHubIcon />
        </ExternalLink>
      </div>
    </header>
  )
})
