import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LinksProvider } from './LinksProvider.tsx'
import './index.css'
import App from './App.tsx'
import Redirect from './Redirect.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LinksProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:code" element={<Redirect />} />
        </Routes>
      </LinksProvider>
    </BrowserRouter>
  </StrictMode>,
)