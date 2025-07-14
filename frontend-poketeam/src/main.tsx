// src/index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter'

// Asegúrate de que el elemento con el ID 'root' existe en tu HTML
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Elemento root no encontrado')
} else {
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  )
}
