import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Box, CircularProgress } from '@mui/material';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Ocupa a tela toda para centralizar
                }}
            >
                <CircularProgress size={50} />
            </Box>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
