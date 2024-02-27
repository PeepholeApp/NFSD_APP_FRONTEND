import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/login.png"; // Import the background image

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgot-password`,
        {
          email,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      setError("Error sending reset email. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <Typography variant="h6" gutterBottom>
          Lost keys? No problem!
        </Typography>
        <StyledForm onSubmit={sendResetEmail}>
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
            {loading ? "Sending Email..." : "Send Reset Email"}
          </StyledButton>
          <StyledLink to="/login">Back to Login</StyledLink>
        </StyledForm>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default ForgotPassword;
