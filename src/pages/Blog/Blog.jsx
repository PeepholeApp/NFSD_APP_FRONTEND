import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

const sections = [
  { title: 'Living in Madrid', url: '#' },
  { title: 'Migrant Information', url: '#' },
  { title: 'First Steps in Madrid', url: '#' },
  // Add more sections as needed
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#654ea3', // Purple color from your theme
    },
  },
  typography: {
    fontFamily: ['Cascadia Code PL'].join(','),
  },
});

const mainFeaturedPost = {
  title: 'Living in Madrid: A Guide for Migrants',
  description:
    'Discover the vibrant life in Madrid and get essential information for migrants on their first steps in this beautiful city.',
  image: './assets/madrid.png', // Change to a Madrid-themed image
  imageText: 'Madrid Cityscape',
  linkText: 'Explore More',
};

const featuredPosts = [
  {
    title: 'Navigating Madrid',
    date: 'Nov 12',
    description:
      'Learn about the neighborhoods, local culture, and the best places to explore in Madrid.',
    image: './assets/madrid_1.jpg', // Change to a Madrid-themed image
    imageLabel: 'Madrid Streets',
  },
  {
    title: 'Settling Down in Madrid',
    date: 'Nov 11',
    description:
      'Get tips on finding accommodation, schools, and healthcare services for a smooth transition.',
    image: './assets/madrid_2.jpg', // Change to a Madrid-themed image
    imageLabel: 'Madrid Sunset',
  },
];

const posts = [
  {
    title: 'First Steps in Madrid',
    content: (
      <React.Fragment>
        <p>
          Find out the essential things you need to do once you arrive in Madrid as a migrant.
        </p>
        <p>
          Check out the <a href="#LivingInMadrid">Living in Madrid</a> section for more information.
        </p>
      </React.Fragment>
    ),
  },
  // Add more posts as needed
];



const sidebar = {
  title: 'About',
  description:
    'Welcome to our blog about living in Madrid! We provide valuable information and insights for migrants to make their life in Madrid enjoyable.',
  archives: [
    { title: 'Madrid Guide', url: '#' },
    { title: 'Migrant Tips', url: '#' },
    // Add more archive links as needed
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Living in Madrid Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Migrant Insights" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Madrid Living Blog"
        description="Your go-to source for information on living in Madrid!"
      />
    </ThemeProvider>
  );
}

