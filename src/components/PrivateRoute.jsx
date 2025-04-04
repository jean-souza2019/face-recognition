import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Box, CircularProgress } from '@mui/material';

function PrivateRoute({ allowedRoles }) {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress size={50} />
            </Box>
        );
    }

    if (!user || !isAuthenticated) return <Navigate to="/login" />;

    if (!allowedRoles.includes(String(user.role).toLowerCase())) return <Navigate to="/" />;

    return <Outlet />;
}

export default PrivateRoute;
