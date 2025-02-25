import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

function Logou() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Realiza o logout
        navigate('/login', { replace: true }); // Redireciona para login
    }, [logout, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress size={50} />
        </Box>
    );
}

export default Logou;
