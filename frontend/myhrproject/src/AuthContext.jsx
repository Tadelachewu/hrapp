import React, { createContext, useContext, useState } from 'react';

// Create Context
const AuthContext = createContext();

// Create a custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around your app and provide auth state
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = (username, password) => {
        // Implement your authentication logic here (e.g., check username and password)
        if (username === 'admin' && password === 'password123') {
            setAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
