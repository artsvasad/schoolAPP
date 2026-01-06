import React from "react";
import { Link } from 'react-router-dom'
import './NavBar.scss'
import RoleGate from "../config/RoleGate";

const NavBar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return (
        <nav className="primary-nav">
            <Link to="/">Home</Link>

            <RoleGate allowedRoles={['super', 'admin', 'desk']}>
                <Link to="/all-students">All Students</Link>
            </RoleGate>
            <RoleGate allowedRoles={['super', 'admin']}>
                <Link to='/create-student'>Create Student</Link>
                <Link to='/create-user'>Create User</Link>
            </RoleGate>
            <RoleGate allowedRoles={['super', 'admin', 'desk', 'student', 'teacher']}>

                <button onClick={handleLogout}>Logout</button>
            </RoleGate>
        </nav>
    )
}

export default NavBar;