import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar.jsx";
import './CreateUser.scss'

import { api } from '../utils/api.js';

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
        
        // --- FIX START: Sanitize Data ---
        // Create a copy so we don't affect the form UI
        const payload = { ...formData };

        // If email is empty string, remove it entirely
        if (!payload.email || payload.email.trim() === "") {
            delete payload.email;
        }
        // --- FIX END ---

        try {
            // Send payload, NOT formData
            const response = await api.post('api/users', payload)
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
        <>
            {/* FIX: NavBar is strictly outside the container */}
            <NavBar/>
            
            <div className="create-user">
                <h2>Create User</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                             <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                            <option value="desk">Desk</option>
                        </select>
                    </div>
                    <div className="form-group">
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
        </>
    )
}

export default CreateUser