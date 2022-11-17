import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { CartProvider } from './context/CartProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
       <App />
    </CartProvider>
       
    </BrowserRouter> 
  </React.StrictMode>
)
