import { ThemeProvider } from '@emotion/react'
import { RootStoreProvider } from 'components/RootStoreContext'
import { GameModelInit } from 'models/game.model'
import { FC, PropsWithChildren } from 'react'
import { GlobalStyles } from 'styles/GlobalStyles'
import { theme } from 'styles/theme'

type ProvidersProps = PropsWithChildren<{ gameInit?: GameModelInit }>

export const Providers: FC<ProvidersProps> = ({ gameInit = {}, children }) => {
  return (
    <RootStoreProvider gameInit={gameInit}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RootStoreProvider>
  )
}
