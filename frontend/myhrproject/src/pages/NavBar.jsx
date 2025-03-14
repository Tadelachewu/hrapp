import { Assignment, Business, Home, LocationOn, Login, Logout, People } from '@mui/icons-material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './NavBar.css';

const NavBar = () => {
    const { authenticated, logout } = useAuth();

    return (
        <div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/" className="nav-link"><Home fontSize="small" /> Home</Link></li>
                    {authenticated ? (
                        <>
                            <li><Link to="/employees" className="nav-link"><People fontSize="small" /> Employees</Link></li>
                            <li><Link to="/departments" className="nav-link"><Business fontSize="small" /> Departments</Link></li>
                            <li><Link to="/branches" className="nav-link"><LocationOn fontSize="small" /> Branches</Link></li>
                            <li><Link to="/leave" className="nav-link"><Assignment fontSize="small" /> Leave Management</Link></li>
                            <li>
                                <button className="logout-button" onClick={logout}>
                                    <Logout fontSize="small" /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/login" className="nav-link"><Login fontSize="small" /> Login</Link></li>
                    )}
                </ul>
            </nav>

            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    );
};

export default NavBar;
