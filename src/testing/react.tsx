import { ThemeProvider } from '@emotion/react'
import { render, RenderOptions } from '@testing-library/react'
import { theme } from 'app/theme'
import { GameInfoProvider } from 'contexts/GameInfoContext'
import { FC, ReactElement } from 'react'

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GameInfoProvider>{children}</GameInfoProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
