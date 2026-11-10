import React, { useEffect, useState } from 'react'
import { isTokenValid } from '../utils/jwtControl'
import { profileMe } from './userService'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function protectedRoute() {

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const validToken = isTokenValid(token)
        if (!validToken) {
            window.location.replace("/")
        }else {
            setIsLogin(true)
            profileMe().then(response => {
                console.log(response)
            }).catch(() => {
                localStorage.removeItem('access_token')
                window.location.replace("/")
            })
        }
    }, [])


  return (
    isLogin ? 
        <>  
            <Navbar />
            <Outlet />
        </>
    : null
  )
}

export default protectedRoute