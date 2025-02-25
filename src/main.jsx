import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndexTeste from './IndexTeste.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndexTeste />
  </StrictMode>,
)
