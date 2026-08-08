import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// IMPORTANTE: o CSS base entra ANTES dos componentes.
// A ordem de import define a ordem no bundle final, e regras de mesma
// especificidade são resolvidas por ordem — se o global viesse depois,
// `.btn` sobrescreveria `.cta-header`, `.cartao` sobrescreveria `.segmento`, etc.
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
