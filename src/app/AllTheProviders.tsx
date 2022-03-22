import { Global, ThemeProvider } from '@emotion/react'
import { FC } from 'react'
import { theme } from 'styling/theme'

import { globalStyles } from './globalStyles'

export const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  )
}
