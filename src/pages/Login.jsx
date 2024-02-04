import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useAuth } from "../context/Login";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: `url('')`, // imagen del background por definir
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledFormContainer = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semi-transparente
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  textAlign: "center",
  width: "80%", // Ajusta el ancho del contenedor
  maxWidth: "400px", // Agrega un ancho máximo para asegurar que no se vuelva demasiado ancho
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  color: theme.palette.primary.main,
  textDecoration: "none",
  '&:hover': {
    textDecoration: "underline",
  },
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
      setError("Please fill in all the fields.");
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
      navigate("/home");
    } catch (error) {
      setError("Error logging in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledFormContainer>
        <Typography variant="h4" gutterBottom>
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
            <Typography variant="body2" style={{ color: "red", margin: "10px 0" }}>
              {error}
            </Typography>
          )}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </StyledButton>
          <StyledLink to="/forgot-password">Forgot your password?</StyledLink>
          <Typography variant="body2">
            Don't have an account? <StyledLink to="/register">Sign up</StyledLink>
          </Typography>
        </StyledForm>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;
