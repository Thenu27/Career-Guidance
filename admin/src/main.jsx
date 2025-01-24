import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { IntellienceProvider } from './Context/intelligence.context.jsx'
import { OLevelProvider } from './Context/OLevel.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IntellienceProvider>
        <OLevelProvider>
          <App />
        </OLevelProvider>
      </IntellienceProvider>
    </BrowserRouter>
  </StrictMode>,
)
