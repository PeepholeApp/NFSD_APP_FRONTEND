import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material';

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });
      const data = response.data;
      setToken(data.token);
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h1" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={login}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography variant="body2" style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <StyledButton type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Login'}
          </StyledButton>
        </StyledForm>
      </div>
    </Container>
  );
};

export default Login;