import * as React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from '../../components/Footer';
import MadridCityScape from '../../assets/madrid-cityscape.png';
import MadridStreets from '../../assets/madrid-streets.png';
import MadridSunset from '../../assets/madrid-sunset.png';



const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#654ea3', 
    },
  },
  typography: {
    fontFamily: ['Cascadia Code PL'].join(','),
  },
});

const mainFeaturedPost = {
  title: 'Living in Madrid: A guide for migrants',
  description:
    'Discover the vibrant life in Madrid and get essential information for migrants on their first steps in this beautiful city.',
  image: MadridCityScape, 
  imageText: 'Madrid Cityscape',
  linkText: 'Explore more',
};

const featuredPosts = [
  {
    title: 'Navigating Madrid',
    date: 'Nov 12',
    description:
      'Learn about the neighborhoods, local culture, and the best places to explore in Madrid.',
    image: MadridStreets, 
    imageLabel: 'Madrid Streets',
  },
  {
    title: 'Settling down in Madrid',
    date: 'Nov 11',
    description:
      'Get tips on finding accommodation, schools, and healthcare services for a smooth transition.',
    image: MadridSunset,
    imageLabel: 'Madrid Sunset',
  },
];

const posts = [
  {
    title: 'First steps in Madrid',
    content: (
      <React.Fragment>
        <p>
          Find out the essential things you need to do once you arrive in Madrid as a migrant.
        </p>
        <p>
          Check out the <a href="#LivingInMadrid">living in Madrid</a> section for more information.
        </p>
      </React.Fragment>
    ),
  },
];




const sidebar = {
  title: 'About',
  description:
    '¡Welcome to your new home away from home!',
  archives: [
    { title: 'Madrid Guide', link: 'https://www.esmadrid.com/sites/default/files/documentos/madrid_imprescindible_2016_ing_web_0.pdf' },
    { title: 'Migrant Tips', link: 'https://www.legalizados.es/empadronarse-espana-primero-debes-hacer-al-emigrar/' },
  ],
};

const socialIcons = [
  { icon: GitHubIcon, link: 'https://github.com/PeepholeApp' },
  { icon: XIcon, link: 'https://twitter.com/Peepholeapp_' },
  { icon: FacebookIcon, link: 'https://www.facebook.com/profile.php?id=61556777854922' },
  { icon: InstagramIcon, link: 'https://www.instagram.com/peepholeapp_/' },
];



export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
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
              archives={sidebar.archives.map(archive => (
                {
                  title: archive.title,
                  url: archive.link
                }
              ))}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Peephole"
        description="Make friends, make memories."
        social={socialIcons}
      />
    </ThemeProvider>
  );
}

