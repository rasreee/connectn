import { ThemeProvider } from '@emotion/react'
import { RootStoreProvider } from 'components/RootStoreContext'
import { GameModelInit } from 'models/game.model'
import { GlobalStyles } from 'styles/GlobalStyles'
import { theme } from 'styles/theme'

export const Providers: React.FC<{ gameInit?: GameModelInit }> = ({
  gameInit = {},
  children,
}) => {
  return (
    <RootStoreProvider gameInit={gameInit}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RootStoreProvider>
  )
}
