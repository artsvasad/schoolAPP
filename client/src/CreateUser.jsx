import React, { useState } from "react";

import { api } from './api.js'

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        role: 'student',
        status: 'active'
    })
    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('Creating user...')
        try {
            const response = await api.post('api/users', formData)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'User creation failed')
            }
            setMessage(`User ${data.user.name} created successfully!`)
            setFormData({
                name: '',
                mobile: '',
                email: '',
                password: '',
                role: 'student',
                status: 'active'
            })
        } catch (error) {
            setMessage(`Error: ${error.message}`)
            console.error(error)

        }
    }
    return (
        <div className="create-user">
            <Header />
            <NavBar />
            <h2>Create User</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="name">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="mobile">
                    <label htmlFor="mobile">Mobile No.</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="password">
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
                <div className="role">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                        <option value="desk">Desk</option>
                    </select>
                </div>
                <div className="status">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <button type="submit">Create User</button>      
            </form>
        </div>
    )
}

export default CreateUser