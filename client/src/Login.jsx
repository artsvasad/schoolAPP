import React, { useState } from "react";
import {api} from './api.js'
const Login = () => {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [status, setStatus] = useState('')
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Logging in...')
        try {
            const response = await api.post('api/users/login', formData)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }
            setStatus(`Success! Welcome ${data.user.name}`)
            console.log('Token:', data.token)

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            setStatus(`Error: ${error.message}`)
            console.error(error)

        }
    }

    return (
        <div className="login">
            <h2>Login</h2>
            {status && <p>{status}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="identifier">Email or Mobile No.</label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange} required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}


export default Login;