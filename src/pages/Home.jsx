import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDark, ButtonLight } from '../components/Button';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../assets/homepage.png';

const WelcomeText = styled(Typography)({
  fontSize: '1.5rem',
  transition: 'font-size 3s',
});

const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '100vh',
});

const ButtonContainer = styled('div')({
  marginTop: theme => theme.spacing(2),
});

const Home = () => {
  const [welcomeText, setWelcomeText] = useState('');
  const originalText = "Knock, knock... ¿Who's knocking on your friendship door?";

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
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain', // Puedes ajustar este valor según tus necesidades
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
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
