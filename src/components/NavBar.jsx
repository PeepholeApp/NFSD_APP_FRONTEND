import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Login";
import axios from "axios";
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
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Profile from "../pages/Profile";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [requests, setRequest] = useState([]);
  const navigate = useNavigate();
  const [menuEl, setMenuEl] = useState(null);

  useEffect(() => {
    if (user) {
      getRequests();
    }
  }, [user]);

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/connections/`,

        {
          headers: {
            //manda el token del usuario verificado
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) {
        setRequest(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setMenuEl(null);
  };

  const onHome = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return user ? (
    <>
      <AppBar component="nav" position="static">
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#0C0C0C",
            boxShadow: "0px 2px 10px 0px #1B0554",
          }}
        >
          <Box onClick={onHome}>
            <img src={logo} alt="logo" style={{ width: 150 }} />
          </Box>

          <Box>
            <Button
              key="home"
              component={Link}
              to="/community"
              sx={{ color: "#fff" }}
            >
              Comunity
            </Button>
            <Button
              key="blog"
              component={Link}
              to="/blog"
              sx={{ color: "#fff" }}
            >
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
          </Box>

          <Stack sx={{ flexGrow: 0 }} gap={1} direction="row">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClick}
              aria-describedby={id}
              type="button"
            >
              <Badge badgeContent={requests.length} color="primary">
                <EmailIcon />
              </Badge>
            </IconButton>

            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {requests.map((profile) => (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={profile.photo[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={profile.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                            {"Hi! — Wants to contact you"}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}

                  <Divider variant="inset" component="li" />
                </List>
              </Box>
            </Popper>

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
          backgroundColor: "#0C0C0C", // Set background color
          boxShadow: "0px 2px 10px 0px #1B0554", // Add drop shadow
        }}
      >
        <Box onClick={onHome}>
          <img src={logo} alt="logo" style={{ width: 150 }} />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
