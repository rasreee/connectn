import { render, RenderOptions } from '@testing-library/react'
import { AllTheProviders } from 'app/AllTheProviders'
import { ReactElement } from 'react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
