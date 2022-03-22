import { render, RenderOptions } from '@testing-library/react'
import { AppProviders } from 'app/AppProviders'
import { ReactElement } from 'react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AppProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
