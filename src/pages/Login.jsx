import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Login";
import ForgotPassword from "./ForgotPassword";
import backgroundImage from "../assets/login.png";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: "moveBackground 20s linear infinite",
  "@keyframes moveBackground": {
    "0%": { backgroundPosition: "0 0" },
    "100%": { backgroundPosition: "100% 100%" },
  },
}));

const StyledFormContainer = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  textAlign: "center",
  width: "80%",
  maxWidth: "400px",
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
  "&:hover": {
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          email,
          password,
        }
      );
      const data = response.data;
      contextLogin({
        token: data.token,
        userId: data.userId,
        profileId: data.profileId,
        role: data.role,
      });
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
          Welcome back
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
              style={{ color: "red", margin: "10px 0" }}
            >
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
            Don't have an account?{" "}
            <StyledLink to="/register">Sign up</StyledLink>
          </Typography>
        </StyledForm>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;
