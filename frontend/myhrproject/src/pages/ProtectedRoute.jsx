import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { authenticated } = useAuth();
    return authenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
