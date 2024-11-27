import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ShopperRoutes from './routes.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopperRoutes />
  </StrictMode>,
)
