import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Importe o Provider
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolva o App com o Provider */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)
