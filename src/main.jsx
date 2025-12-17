import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { TaskContextProvider } from './context/taskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </TaskContextProvider>
  </StrictMode>
)
