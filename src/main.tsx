import { createRoot } from 'react-dom/client'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'

// import components
import Register from './components/Register'
import Login from './components/Login'

const router = 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

createRoot(document.getElementById('root')!).render(
  router
)
