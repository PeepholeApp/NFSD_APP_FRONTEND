import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useAuth } from "../context/Login";

const StyledForm = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      const data = response.data;
      contextLogin({ token: data.token, userId: data.userId });
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
            <Typography
              variant="body2"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {error}
            </Typography>
          )}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </StyledButton>
        </StyledForm>
      </div>
    </Container>
  );
};

export default Login;
