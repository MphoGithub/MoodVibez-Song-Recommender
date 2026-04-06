import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import { AuthProvider } from './context/authContext.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter >
    <App />
    <Toaster />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
