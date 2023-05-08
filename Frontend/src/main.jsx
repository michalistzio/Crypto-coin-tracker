import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css';
import './index.css'
import CoinDetails from './pages/CoinDetails.jsx';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/coin/:id', element: <CoinDetails />}  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router} />
)
