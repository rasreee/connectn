import { Global, ThemeProvider } from '@emotion/react'
import { FC } from 'react'
import { globalStyles } from 'styling/globalStyles'
import { theme } from 'styling/theme'

export const AppProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  )
}
