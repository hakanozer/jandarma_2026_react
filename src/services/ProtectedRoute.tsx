import  { useEffect, useState } from 'react'
import { isTokenValid } from '../utils/jwtControl'
import { profileMe } from './userService'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useProtection } from '../utils/useProtection'

function protectedRoute() {

    useProtection();

    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const validToken = isTokenValid(token)
        if (!validToken) {
            window.location.replace("/")
        }else {
            setIsLogin(true)
            profileMe().then(response => {
                //console.log(response)
                setName(response.data.data.name)
            }).catch(() => {
                localStorage.removeItem('access_token')
                window.location.replace("/")
            })
        }
    }, [])

    useEffect(() => {
        const preventContextMenu = (e: any) => e.preventDefault();
        document.addEventListener("contextmenu", preventContextMenu);
        return () => {
            document.removeEventListener(
            "contextmenu",
            preventContextMenu
            );
        };
    }, []);


  return (
    isLogin ? 
        <>  
            <Navbar name={name} />
            <Outlet />
        </>
    : null
  )
}

export default protectedRoute