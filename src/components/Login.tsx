import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userLogin } from '../services/userService'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault() // formu gönderme durdur
        userLogin(email, password).then(res => {
            console.log(res.data.data.access_token)
            localStorage.setItem('access_token', res.data.data.access_token)
            window.location.replace("/products")
        }).catch(() => {
            setError("Kullanıcı adı veya şifre hatalı")
        })
    }

    useEffect(() => {
        setError('')
    }, [email, password])


  return (
    <div className='row'>
        <div className='sm:col-4 md:col-2 lg:col-4'></div>
        <div className='sm:col-4 md:col-8 lg:col-4'>
            <h2>Login</h2>
            { error != '' && 
                <div className="alert theme-danger" role="alert">
                    <p>{error}</p>
                </div>
            }
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input  required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We’ll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-field">
                <input checked={checked} onChange={(e) => setChecked(e.target.checked)} type="checkbox" id="exampleCheck1" className="check" />
                <label htmlFor="exampleCheck1">Check me out</label>
            </div>
            <div className='d-flex justify-content-between'>
                <button type="submit" className="btn-solid theme-primary">Login</button>
                <Link to="/register" className='btn-solid theme-success'>Register</Link>
            </div>
            </form>
        </div>
        <div className='sm:col-4 md:col-2 lg:col-4'></div>
    </div>
  )
}

export default Login