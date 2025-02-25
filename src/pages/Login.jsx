import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

function Login() {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Preencha todos os campos.');
            return;
        }

        setError('');
        login(); // Simula o login
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', mt: 8 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Faça login para acessar o sistema.
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error && !email}
                        helperText={!!error && !email ? 'E-mail é obrigatório' : ''}
                    />
                    <TextField
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error && !password}
                        helperText={!!error && !password ? 'Senha é obrigatória' : ''}
                    />
                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
