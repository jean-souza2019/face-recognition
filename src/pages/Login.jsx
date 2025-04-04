import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

function Login() {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!loginValue || !password) {
            setError('Preencha todos os campos.');
            return;
        }

        try {
            await login({ login: loginValue, password });
        } catch (err) {
            setError(err.message || 'Erro ao fazer login');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
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
                        label="Login"
                        variant="outlined"
                        fullWidth
                        value={loginValue}
                        onChange={(e) => setLoginValue(e.target.value)}
                        error={!!error && !loginValue}
                        helperText={!!error && !loginValue ? 'Login é obrigatório' : ''}
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
