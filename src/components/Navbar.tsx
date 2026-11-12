import React, { useEffect, useState } from 'react'
import { likesArr } from '../utils/likesControl'
import {  NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../services/userService'

function Navbar(props: { name: string }) {

    const [q, setQ] = useState('')
    const [likesCount, setLikesCount] = useState(0)

   const handleLogOut = () => {
    const answer = window.confirm("Çıkış yapmak istediğinize emin misiniz?")
    if (answer) {
            logOut().then(() => {
                localStorage.removeItem('access_token')
                window.location.replace("/")
            })
       }
   }

   const navigate = useNavigate()
   const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
     e.preventDefault()
     navigate(`/search?q=${q}`)
   }

   useEffect(() => {
    setLikesCount(likesArr().length)
   }, [])
   

  return (
    <nav className="navbar md:navbar-expand bg-1">
    <div className="container-fluid">
        <a className="navbar-brand">App Title</a>
        <button className="btn-icon navbar-toggler" type="button" data-bs-toggle="drawer" data-bs-target="#navbarDrawer" aria-controls="navbarDrawer" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" aria-hidden="true"></span>
        </button>
        <dialog className="drawer drawer-end" tabIndex={-1} id="navbarDrawer" aria-labelledby="navbarDrawerLabel">
        <div className="drawer-header">
            <h5 className="drawer-title" id="navbarDrawerLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
        </div>
        <div className="drawer-body mb-2 md:mb-0">
            <ul className="nav navbar-nav me-auto">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/likes">Likes</NavLink>
            </li>
            <li className="nav-item">
                <button className="nav-link" type="button" data-bs-toggle="menu" aria-expanded="false">
                Profile <i className="bi bi-chevron-down"></i>
                </button>
                <div className="menu">
                <a className="menu-item" href="#">Action</a>
                <a className="menu-item" href="#">Another action</a>
                <hr className="menu-divider"/>
                <a className="menu-item" onClick={handleLogOut} >Log Out</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">{props.name} ({likesCount})</a>
            </li>
            </ul>
            <form onSubmit={handleSearch} className="hstack gap-2" role="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn-solid btn-icon theme-secondary" type="submit">
                <i className="bi bi-search"></i>
            </button>
            </form>
        </div>
        </dialog>
    </div>
    </nav>
  )
}

export default Navbar