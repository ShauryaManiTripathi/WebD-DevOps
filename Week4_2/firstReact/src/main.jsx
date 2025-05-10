import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { ReactNative } from 'react-native-web' // for react native // not to be used rn
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
