import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './NavBar.css';
const NavBar = () => {
    const { authenticated, logout } = useAuth();

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {authenticated ? (
                        <>
                            <li><Link to="/employees">Employees</Link></li>
                            <li><Link to="/departments">Departments</Link></li>
                            <li><Link to="/branches">Branches</Link></li>
                            <li><Link to="/leave">Leave Management</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
                <hr />
            </nav>

            {/* This will render the child components */}
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    );
};

export default NavBar;
