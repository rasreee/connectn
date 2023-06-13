import App from 'components/App'
import { Providers } from 'components/App/Providers'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
