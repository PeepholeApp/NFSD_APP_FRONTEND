import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Login";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuEl, setMenuEl] = useState(null);

  const handleClose = () => {
    setMenuEl(null);
  };

  const onHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return user ? (
    <>
      <AppBar component="nav" position="static">
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box onClick={onHome}>
            <img src={logo} alt="logo" style={{ width: 150 }} />
          </Box>

          <Box>
            <Button
              key="home"
              onClick={() => navigate("/community")}
              sx={{ color: "#fff" }}
            >
              Comunity
            </Button>
            <Button
              key="blog"
              onClick={() => navigate("/blog")}
              sx={{ color: "#fff" }}
            >
              Blog
            </Button>
            <Button
              key="about"
              onClick={() => navigate("/aboutUs")}
              sx={{ color: "#fff" }}
            >
              About us
            </Button>
            <Button
              key="contact"
              onClick={() => navigate("/contact")}
              sx={{ color: "#fff" }}
            >
              Contact
            </Button>
          </Box>

          <Stack sx={{ flexGrow: 0 }} gap={1} direction="row">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={2} color="primary">
                <EmailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => {
                  setMenuEl(event.currentTarget);
                }}
                sx={{ p: 0 }}
              >
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={menuEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(`/user/${user.profileId}`);
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>Help</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  ) : (
    <AppBar component="nav" position="static">
      <Toolbar
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box onClick={onHome}>
          <img src={logo} alt="logo" style={{ width: 150 }} />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button key="app" sx={{ color: "#fff" }}>
            App
          </Button>
          <Button key="about" sx={{ color: "#fff" }}>
            About us
          </Button>
          <Button key="blog" sx={{ color: "#fff" }}>
            Blog
          </Button>
        </Box>
        <Box>
          <Button onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleSignUp}>Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
