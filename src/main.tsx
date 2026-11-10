import { createRoot } from 'react-dom/client'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import './utils/App.css'

// import components
import Register from './components/Register'
import Login from './components/Login'
import Products from './components/Products'
import Likes from './components/Likes'
import ProtectedRoute from './services/ProtectedRoute'

const router = 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/likes" element={<Likes />} />
        </Route>
      </Routes>
    </BrowserRouter>

createRoot(document.getElementById('root')!).render(
  router
)
