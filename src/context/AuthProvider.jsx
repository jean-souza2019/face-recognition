import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');

        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                console.log('decoded', decoded)
                setUser(decoded);
                setToken(savedToken);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Token inválido:', err);
                logout();
            }
        }

        setLoading(false);
    }, []);

    const login = async ({ login, password }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const { token } = await response.json();
            const decoded = jwtDecode(token);

            localStorage.setItem('auth_token', token);
            setToken(token);
            setUser(decoded);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Erro no login:', error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
