import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './Index.jsx'
import { ThemeProviderWrapper } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Index />
    </ThemeProviderWrapper>
  </StrictMode>,
)
