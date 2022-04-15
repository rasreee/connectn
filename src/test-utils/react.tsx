import { render, RenderOptions } from '@testing-library/react'
import { Providers } from 'components/App/Providers'
import { ReactElement } from 'react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render, render as defaultRender }
