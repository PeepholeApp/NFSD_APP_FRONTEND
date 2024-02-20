import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/homepage.png";
import { ButtonDark, ButtonLight } from "../components/Button";

const ImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "75vh", // Adjust the height as needed
});

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const WelcomeText = styled(Typography)({
  fontSize: "1.5rem",
  transition: "font-size 3s",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
});

const ButtonContainer = styled("div")({
  marginTop: (theme) => theme.spacing(2),
});

const Home = () => {
  const [welcomeText, setWelcomeText] = useState("");
  const originalText =
    "Knock, knock... ¿Who's knocking on your friendship door?";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setWelcomeText(originalText.substring(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === originalText.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <ImageContainer>
        <Image src={backgroundImage} alt="Background" />
      </ImageContainer>

      <ContentContainer>
        <WelcomeText variant="h1" color="white" mb={2}>
          {welcomeText}
        </WelcomeText>

        <ButtonContainer>
          <Link to="/register">
            <ButtonDark>Sign Up</ButtonDark>
          </Link>
          <Link to="/login">
            <ButtonLight>Sign In</ButtonLight>
          </Link>
        </ButtonContainer>
      </ContentContainer>
    </Box>
  );
};

export default Home;
