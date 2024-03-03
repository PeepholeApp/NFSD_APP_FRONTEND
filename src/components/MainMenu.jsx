import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const MainMenu = ({ logged, vertical, onMenuClick }) => {
  const stackProps = vertical
    ? {
        mt: 2,
        sx: {
          width: 250,
        },
      }
    : {
        direction: "row",
      };

  return (
    <Stack {...stackProps} onClick={onMenuClick}>
      {logged ? (
        <>
          <Button
            key="home"
            component={Link}
            to="/community"
            sx={{ color: "#fff" }}
          >
            Comunity
          </Button>
          <Button key="blog" component={Link} to="/blog" sx={{ color: "#fff" }}>
            Blog
          </Button>
          <Button
            key="about"
            component={Link}
            to="/aboutUs"
            sx={{ color: "#fff" }}
          >
            About us
          </Button>
          <Button
            key="contact"
            component={Link}
            to="/contact"
            sx={{ color: "#fff" }}
          >
            Contact
          </Button>
        </>
      ) : (
        <>
          <Button key="app" component={Link} to="/app" sx={{ color: "#fff" }}>
            App
          </Button>
          <Button
            key="about"
            component={Link}
            to="/aboutUs"
            sx={{ color: "#fff" }}
          >
            About us
          </Button>
          <Button key="blog" component={Link} to="/blog" sx={{ color: "#fff" }}>
            Blog
          </Button>
        </>
      )}
    </Stack>
  );
};

export default MainMenu;
