import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
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

function WelcomeMessage() {
  return (
    <Box mb={4} textAlign="center">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Greetings, explorer!
      </Typography>
      <Typography variant="body2" color="textSecondary">
        The peephole reveals a community excited to welcome you.
      </Typography>
    </Box>
  );
}

export default function SignUp() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setDuplicateEmailError("");
    setGeneralError("");
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

    if (!validateEmail(email)) {
      setGeneralError("Invalid email address");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/check-email?email=${email}`
      );

      if (response.data.isDuplicate) {
        setDuplicateEmailError("Email is already registered");
        setGeneralError("");
        return;
      }

      const registrationResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          email,
          password,
        }
      );

      if (registrationResponse.status === 201) {
        console.log("Registration successful.");
        navigate("/login");
      } else {
        console.error(
          "Error in registration:",
          registrationResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setGeneralError("An unexpected error occurred");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <WelcomeMessage />
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
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {duplicateEmailError && (
                    <Typography variant="body2" color="error" mt={1}>
                      {duplicateEmailError}
                    </Typography>
                  )}
                </Grid>
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
                onClick={handleOpenModal}
              >
                Sign Up
              </Button>
            </Box>
            <Dialog open={openModal} onClose={handleClose}>
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogContent>
                <Typography>Terms and conditions go here.</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  ACCEPT
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </StyledBox>
      </Container>
    </StyledContainer>
  );
}
