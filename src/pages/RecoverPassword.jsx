import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  textAlign: "center",
  width: "90%",
  maxWidth: "500px",
}));

export default function RecoverPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/password-recovery/verify-token`,
        {
          token,
        }
      );
    } catch (error) {
      setGeneralError(error.response.data.error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/password-recovery/reset-password`,
        {
          token,
          password,
        }
      );

      setMessage("Password changed successfully. You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setGeneralError(error.response.data.error);
    }
  };

  return message ? (
    <StyledContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
        </StyledBox>
      </Container>
    </StyledContainer>
  ) : generalError === "Token is invalid" ? (
    <StyledContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            {generalError}
          </Typography>
          <Button
            onClick={() => navigate("/forgot-password")}
            variant="contained"
          >
            Start over!
          </Button>
        </StyledBox>
      </Container>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledBox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              {generalError && (
                <Typography variant="body2" color="error" mb={2}>
                  {generalError}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="New password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </StyledBox>
      </Container>
    </StyledContainer>
  );
}
